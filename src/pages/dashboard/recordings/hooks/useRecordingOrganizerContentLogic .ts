import { getPresignedUrl } from "@/api/resource.api";
import { PrivateFiles } from "@/enums/file-type.enum";
import { ResourceTypes } from "@/enums/resource-types.enum";
import { Resource } from "@/models/recording/recording.model";
import { useRecordingStore } from "@/store/recording.store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useRecordingOrganizerContentLogic = () => {
    const { recordingId } = useParams<{ recordingId: string }>();
    const { selectedRecording, getOrganizerRecording } = useRecordingStore();
    const [videoResource, setVideoResource] = useState<{
        id: number;
        title: string;
        type: ResourceTypes;
        description: string;
        publicUrl: string;
    } | null>(null);

    useEffect(() => {
        if (recordingId) {
            getOrganizerRecording(Number(recordingId));
        }
    }, [recordingId, getOrganizerRecording]);

    const handleResourceClick = async (resource: Resource) => {
        if (resource.type === ResourceTypes.VIDEO && resource.file && selectedRecording) {
            try {
                const presignedData = await getPresignedUrl(
                    resource.file.key!,
                    PrivateFiles.RECORDING,
                    selectedRecording.recording.id
                );

                if (presignedData.data) {
                    setVideoResource({
                        id: resource.id,
                        title: resource.title,
                        type: resource.type,
                        description: resource.description,
                        publicUrl: presignedData.data,
                    });
                }
            } catch (error) {
                toast.error('Error al obtener URL presignada para video');
                if (resource.file.publicUrl) {
                    setVideoResource({
                        id: resource.id,
                        title: resource.title,
                        type: resource.type,
                        description: resource.description,
                        publicUrl: resource.file.publicUrl,
                    });
                }
            }
        }
    };

    const handleDownload = async (resource: Resource) => {
        if (!selectedRecording) return;

        try {
            if (!resource.file) {
                toast.error('No hay archivo asociado al recurso');
                return;
            }

            const presignedData = await getPresignedUrl(
                resource.file.key!,
                PrivateFiles.RECORDING,
                selectedRecording.recording.id
            );

            if (presignedData.data) {
                window.open(presignedData.data, '_blank');
            }
        } catch (error) {
            toast.error('Error al obtener URL de descarga');
        }
    };

    const isPlayableVideo = (resource: Resource): boolean => {
        return resource.type === ResourceTypes.VIDEO && !!resource.file;
    };

    const isDownloadable = (resource: Resource): boolean => {
        return resource.type !== ResourceTypes.VIDEO && !!resource.file;
    };

    const resources = selectedRecording?.recording.resources || [];

    return {
        recordingId,
        selectedRecording,
        videoResource,
        setVideoResource,
        resources,
        handleResourceClick,
        handleDownload,
        isPlayableVideo,
        isDownloadable,
    };
};