import { getPresignedUrl } from "@/api/resource.api";
import { PrivateFiles } from "@/enums/file-type.enum";
import {
  useOrganizerActions,
  useOrganizerSelector,
} from "@/store/organizer.store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useOrganizerDetailLogic = () => {
  const { id } = useParams<{ id: string }>();
  const organizer = useOrganizerSelector.useOrganizer();
  const isLoading = useOrganizerSelector.useIsLoading();
  const error = useOrganizerSelector.useError();
  const { fetchOrganizer, StatusOrganizer } = useOrganizerActions();

  useEffect(() => {
    if (id) {
      fetchOrganizer(parseInt(id));
    }
  }, [id, fetchOrganizer]);

  const handleVerification = async () => {
    if (organizer?.id) {
      try {
        await StatusOrganizer(organizer.id);
        await fetchOrganizer(organizer.id);
      } catch (error) {
        toast.error("Error al cambiar el estado de verificación");
      }
    }
  };

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

  return {
    organizer,
    isLoading,
    error,
    handleVerification,
    handleDownloadCV,
    formatDate,
  };
};
