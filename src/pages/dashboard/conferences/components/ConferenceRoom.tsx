import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/context/auth.context";
import { ConferenceStatus } from "@/enums/conference-status.enum";
import { useConferenceOrganizerStore } from "@/store/conference-organizer.store";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { ArrowLeft, Camera, Loader2, Lock, Mic } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ConferenceRoom: React.FC = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [_, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasDevicePermissions, setHasDevicePermissions] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { joinConference, videoToken, updateConferenceStatus } =
    useConferenceOrganizerStore();

  const formatRoomName = (roomName: string) => {
    return roomName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const roomName = name ? formatRoomName(name) : "default-room";
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null,
  );
  const [microphonePermission, setMicrophonePermission] = useState<
    boolean | null
  >(null);

  const defaultConfig = {
    prejoinPageEnabled: true,
    startWithAudioMuted: false,
    disableDeepLinking: true,
    startWithVideoMuted: true,
    disableVideoPreview: true,
    disableModeratorIndicator: false,
    remoteVideoMenu: {
      disableKick: false,
      disableGrantModerator: false,
      disablePrivateChat: false,
    },
    disableProfile: false,
    disableInviteFunctions: false,
    readOnlyName: true,
    desktopSharingEnabled: true,
  };

  const interfaceConfig = {
    TOOLBAR_BUTTONS: [
      "microphone",
      "camera",
      "closedcaptions",
      "desktop",
      "fullscreen",
      "participants-pane",
      "fodeviceselection",
      "hangup",
      "profile",
      "chat",
      "recording",
      "livestreaming",
      "settings",
      "raisehand",
      "videoquality",
      "filmstrip",
      "stats",
      "shortcuts",
      "tileview",
      "mute-everyone",
      "security",
    ],
    SETTINGS_SECTIONS: [
      "devices",
      "language",
      "moderator",
      "profile",
      "calendar",
    ],
  };

  useEffect(() => {
    if (id && user && videoToken == null) {
      joinConference(id);
    }
  }, [joinConference, id, user, videoToken]);

  useEffect(() => {
    const updateConferenceStatusStatus = async () => {
      if (id && hasDevicePermissions && videoToken) {
        try {
          updateConferenceStatus(id, ConferenceStatus.ON_GOING);
        } catch (error) {}
      }
    };

    updateConferenceStatusStatus();
  }, [id, hasDevicePermissions, videoToken]);

  useEffect(() => {
    const checkDevicePermissions = async () => {
      try {
        const cameraResult = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setCameraPermission(true);
        cameraResult.getTracks().forEach((track) => track.stop());

        const microphoneResult = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setMicrophonePermission(true);
        microphoneResult.getTracks().forEach((track) => track.stop());

        setHasDevicePermissions(true);
      } catch (err) {
        const error = err as Error;
        if (
          error.name === "NotAllowedError" ||
          error.name === "PermissionDeniedError"
        ) {
          setError(
            "Por favor, permite el acceso a la cámara y micrófono para unirte a la reunión.",
          );
        } else {
          setError("No se pudo acceder a los dispositivos de audio/video.");
        }
      }
    };

    checkDevicePermissions();
  }, []);

  const handleApiReady = (api: any) => {
    setIsLoading(false);

    api.addEventListener("participantKicked", (participant: any) => {
      console.log("Participant kicked:", participant);
    });

    api.addEventListener("videoMuteStatusChanged", (muted: boolean) => {
      console.log("Video mute status:", muted);
    });

    api.addEventListener("audioMuteStatusChanged", (muted: boolean) => {
      console.log("Audio mute status:", muted);
    });
  };

  const handleGoBack = async () => {
    navigate("/dashboard/conference");
  };

  if (!hasDevicePermissions) {
    return (
      <div className="flex h-[800px] items-center justify-center bg-grayscale-100">
        <div className="mx-auto max-w-md rounded-2xl border border-primary-100 bg-white p-8 shadow">
          <h2 className="mb-4 text-center text-xl font-semibold text-grayscale-800">
            Permisos necesarios
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Camera
                className={`size-5 ${
                  cameraPermission
                    ? "text-primary-500-main"
                    : "text-grayscale-600"
                }`}
              />
              <span className="text-grayscale-600">
                Cámara: {cameraPermission ? "Permitido" : "Pendiente"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Mic
                className={`size-5 ${
                  microphonePermission
                    ? "text-primary-500-main"
                    : "text-grayscale-600"
                }`}
              />
              <span className="text-grayscale-600">
                Micrófono: {microphonePermission ? "Permitido" : "Pendiente"}
              </span>
            </div>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}
            <Button onClick={() => window.location.reload()} className="w-full">
              Reintentar
            </Button>
            <Button
              onClick={handleGoBack}
              className="w-full"
              intent="secondary"
            >
              Volver
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!videoToken) {
    return (
      <div className="flex h-[800px] items-center justify-center bg-grayscale-100">
        <div className="mx-auto max-w-md rounded-2xl border border-primary-100 bg-white p-8 shadow">
          <h2 className="mb-4 text-center text-xl font-semibold text-grayscale-800">
            Conectando a la conferencia
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Camera
                className={`size-5 ${
                  cameraPermission
                    ? "text-primary-500-main"
                    : "text-grayscale-600"
                }`}
              />
              <span className="text-grayscale-600">
                Cámara: {cameraPermission ? "Permitido" : "Pendiente"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Mic
                className={`size-5 ${
                  microphonePermission
                    ? "text-primary-500-main"
                    : "text-grayscale-600"
                }`}
              />
              <span className="text-grayscale-600">
                Micrófono: {microphonePermission ? "Permitido" : "Pendiente"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Loader2 className="size-5 animate-spin text-primary-500-main" />
              <span className="text-grayscale-600">
                Token de acceso: {videoToken ? "Listo" : "Obteniendo..."}
              </span>
            </div>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}
            <Button onClick={() => window.location.reload()} className="w-full">
              Reintentar
            </Button>
            <Button
              onClick={handleGoBack}
              className="w-full"
              intent="secondary"
            >
              Volver
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="fixed inset-0 flex flex-col">
      <div className="flex h-screen w-screen flex-col">
        <div className="flex-none bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
            <button
              onClick={handleGoBack}
              className="flex items-center text-grayscale-600 hover:text-grayscale-800"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Volver a conferencias
            </button>
            <div className="flex items-center space-x-4">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                Moderador
              </span>
              <div className="flex items-center">
                <Lock className="mr-2 h-4 w-4 text-green-500" />
                <span className="text-sm text-grayscale-600">Sala segura</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-0">
            <JitsiMeeting
              domain="meet.handin.pro"
              roomName={roomName}
              jwt={videoToken}
              configOverwrite={{
                ...defaultConfig,
                constraints: {
                  video: {
                    height: {
                      ideal: window.innerHeight,
                      max: window.innerHeight,
                      min: window.innerHeight,
                    },
                  },
                },
              }}
              interfaceConfigOverwrite={interfaceConfig}
              getIFrameRef={(iframeRef) => {
                if (iframeRef) {
                  iframeRef.style.height = "100%";
                  iframeRef.style.width = "100%";
                  iframeRef.style.position = "absolute";
                  iframeRef.style.top = "0";
                  iframeRef.style.left = "0";
                  iframeRef.style.right = "0";
                  iframeRef.style.bottom = "0";
                  iframeRef.style.overflow = "hidden";
                }
              }}
              lang="es-ES"
              release="stable"
              spinner={JitsiSpinner}
              onApiReady={handleApiReady}
              onReadyToClose={handleGoBack}
              userInfo={{
                displayName: `${user?.user?.firstName} ${user?.user?.lastName}`,
                email: user!.user.email,
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ConferenceRoom;

const JitsiSpinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-100/90">
      <div className="flex flex-col items-center">
        <Loader2 size={48} className="animate-spin text-blue-600" />
        <p className="mt-4 font-medium text-gray-700">Cargando reunión...</p>
      </div>
    </div>
  );
};
