import { getPresignedUrl } from "@/api/resource.api";
import { useAuthStore } from "@/context/auth.context";
import { PrivateFiles } from "@/enums/file-type.enum";
import {
  useOrganizerActions,
  useOrganizerSelector,
} from "@/store/organizer.store";
import { NewOrganizerForm } from "@/types/organizer/organizer.type";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useUserProfileLogic = () => {
  const { user } = useAuthStore();

  const organizer = useOrganizerSelector.useOrganizer();
  const isLoading = useOrganizerSelector.useIsLoading();
  const error = useOrganizerSelector.useError();

  const {
    fetchOrganizerProfile,
    createOrganizerProfile,
    updateOrganizerProfile,
  } = useOrganizerActions();

  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const formMethods = useForm<NewOrganizerForm>({
    defaultValues: {
      degree: "",
      specialty: "",
      biography: "",
      experience: [],
      education: [],
      certifications: [],
      skills: [],
      socialMedia: {},
    },
  });

  const refreshOrganizerData = useCallback(async () => {
    try {
      await fetchOrganizerProfile();
    } catch (err) {}
  }, [fetchOrganizerProfile]);

  const initializeOrganizerProfile = useCallback(async () => {
    if (
      user?.user.roles?.includes("Usuario") ||
      user?.user.roles?.includes("Organizador")
    ) {
      try {
        await fetchOrganizerProfile();
      } catch (err) {
        toast.error("Error al recuperar el perfil del profesor");
      }
    }
  }, [user, fetchOrganizerProfile]);

  useEffect(() => {
    initializeOrganizerProfile();
  }, [initializeOrganizerProfile]);

  const handleDownloadCV = async () => {
    if (organizer?.cv) {
      try {
        const res = await getPresignedUrl(
          organizer.cv.key,
          PrivateFiles.CV,
          organizer.id,
        );
        const url = res.data || "";
        if (url) {
          window.open(url, "_blank");
        }
      } catch (error) {
        toast.error("No se pudo descargar el Brochure, intentelo más tarde");
      }
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setFileError("El archivo debe ser un PDF");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setFileError(null);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setFileError(null);
    const fileInput = document.getElementById(
      "file-upload",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const isValidUrl = (url: string): boolean => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const formatUrl = (url: string, defaultDomain: string): string => {
    if (!url) return "";
    if (isValidUrl(url)) return url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${defaultDomain}/${url.replace(/^\/+/, "")}`;
    }
    return `https://${defaultDomain}`;
  };

  const onSubmit = async (data: NewOrganizerForm) => {
    if (!organizer && !selectedFile) {
      setFileError("Debes subir un Brochure en formato PDF");
      return;
    }

    setFileError(null);
    setSubmitError(null);

    try {
      if (organizer?.id) {
        await updateOrganizerProfile({
          ...data,
          ...(selectedFile && { file: selectedFile }),
        });
        toast.success("Perfil actualizado exitosamente");
      } else {
        if (!selectedFile) {
          setFileError(
            "Debes subir un Brochure en formato PDF para crear el perfil",
          );
          return;
        }
        await createOrganizerProfile({
          ...data,
          file: selectedFile,
        });
        toast.success("Perfil creado exitosamente");
      }

      setFileError(null);

      await new Promise((resolve) => setTimeout(resolve, 100));
      await refreshOrganizerData();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Error al procesar el perfil",
      );

      setTimeout(() => {
        refreshOrganizerData();
      }, 500);
    }
  };

  const forceRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  return {
    user,
    organizer,
    isLoading,
    error,
    fileError,
    submitError,
    selectedFile,
    formMethods,
    handleDownloadCV,
    formatDate,
    handleFileChange,
    handleFileRemove,
    isValidUrl,
    formatUrl,
    onSubmit,
    setFileError,
    setSubmitError,
    refreshOrganizerData,
    forceRefresh,
  };
};
