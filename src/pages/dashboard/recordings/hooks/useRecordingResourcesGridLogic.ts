import { ValidExtensions } from "@/enums/valid-extensions.enum";
import { useResourceStore } from "@/store/resource.store";
import { CreateResourceForm } from "@/types/recording/resource.type";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useRecordingResourcesLogic = (onResourceChange?: () => void) => {
  const { recordingId } = useParams<{ recordingId: string }>();

  const { createResource, removeResource } = useResourceStore();

  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [resourcePreview, setResourcePreview] = useState("");

  const [resourceFormData, setResourceFormData] = useState<CreateResourceForm>({
    title: "",
    recordingId: Number(recordingId),
    description: "",
    type: "Documento",
    file: null,
    url: "",
  });

  const handleAddResource = () => {
    setSelectedResourceId(null);
    setResourceFormData({
      title: "",
      description: "",
      type: "Documento",
      recordingId: Number(recordingId),
      file: null,
    });
    setResourcePreview("");
    setIsResourceModalOpen(true);
  };

  const handleCloseResourceModal = () => {
    setIsResourceModalOpen(false);
    setSelectedResourceId(null);
    setResourceFormData({
      title: "",
      recordingId: Number(recordingId),
      description: "",
      type: "Documento",
      file: null,
    });
    setResourcePreview("");
    setFormError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    let isValid = false;

    switch (resourceFormData.type) {
      case "Imagen":
        isValid = [
          ValidExtensions.JPG,
          ValidExtensions.JPEG,
          ValidExtensions.PNG,
          ValidExtensions.GIF,
        ].includes(fileExtension as ValidExtensions);
        break;
      case "Documento":
        isValid = [
          ValidExtensions.PDF,
          ValidExtensions.DOCX,
          ValidExtensions.XLSX,
          ValidExtensions.PPTX,
          ValidExtensions.ODT,
          ValidExtensions.ODS,
          ValidExtensions.ODP,
          ValidExtensions.TXT,
          ValidExtensions.RTF,
        ].includes(fileExtension as ValidExtensions);
        break;
      case "Video":
        isValid = [
          ValidExtensions.AVI,
          ValidExtensions.MP4,
          ValidExtensions.MOV,
          ValidExtensions.FLV,
          ValidExtensions.MKV,
        ].includes(fileExtension as ValidExtensions);
        break;
      case "Archivo comprimido":
        isValid = [
          ValidExtensions.ZIP,
          ValidExtensions.RAR,
          ValidExtensions.TAR,
          ValidExtensions["7Z"],
        ].includes(fileExtension as ValidExtensions);
        break;
      default:
        isValid = true;
    }

    if (!isValid) {
      let allowedExtensions: any = [];
      switch (resourceFormData.type) {
        case "Imagen":
          allowedExtensions = ["JPG", "JPEG", "PNG", "GIF"];
          break;
        case "Documento":
          allowedExtensions = [
            "PDF",
            "DOCX",
            "XLSX",
            "PPTX",
            "ODT",
            "ODS",
            "ODP",
            "TXT",
            "RTF",
          ];
          break;
        case "Video":
          allowedExtensions = ["AVI", "MP4", "MOV", "FLV", "MKV"];
          break;
        case "Archivo comprimido":
          allowedExtensions = ["ZIP", "RAR", "TAR", "7Z"];
          break;
      }

      toast.error(
        `Tipo de archivo no permitido. Extensiones válidas: ${allowedExtensions.join(", ")}`,
      );
      e.target.value = "";
      return;
    }

    let maxSize = 0;
    switch (resourceFormData.type) {
      case "Imagen":
        maxSize = 2 * 1024 * 1024;
        break;
      case "Documento":
        maxSize = 10 * 1024 * 1024;
        break;
      case "Video":
        maxSize = 500 * 1024 * 1024;
        break;
      case "Archivo comprimido":
        maxSize = 100 * 1024 * 1024;
        break;
      default:
        maxSize = 100 * 1024 * 1024;
    }

    if (file.size > maxSize) {
      toast.error(
        `El archivo excede el tamaño máximo permitido (${maxSize / (1024 * 1024)}MB)`,
      );
      e.target.value = "";
      return;
    }

    setResourceFormData({
      ...resourceFormData,
      file: file,
    });

    if (resourceFormData.type === "Imagen") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setResourcePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !resourceFormData.title.trim() ||
      !resourceFormData.description.trim()
    ) {
      setFormError("Todos los campos son requeridos");
      return;
    }

    if (resourceFormData.type === "Enlace" && !resourceFormData.url?.trim()) {
      setFormError("La URL es requerida para el tipo de recurso Enlace");
      return;
    }

    if (resourceFormData.type !== "Enlace" && !resourceFormData.file) {
      setFormError("El archivo es requerido");
      return;
    }

    setIsSubmitting(true);
    try {
      if (selectedResourceId) {
        toast.success("Recurso actualizado exitosamente");
      } else {
        await createResource(resourceFormData, onResourceChange);
        toast.success("Recurso creado exitosamente");
      }
      handleCloseResourceModal();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ha ocurrido un error";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveResourcePreview = () => {
    setResourcePreview("");
    setResourceFormData({
      ...resourceFormData,
      file: null,
    });
  };

  const handleDeleteResource = async (resourceId: number) => {
    try {
      await removeResource(resourceId, onResourceChange);
    } catch (error) {
      toast.error("Error al eliminar el recurso");
    }
  };

  return {
    recordingId,
    isResourceModalOpen,
    selectedResourceId,
    isSubmitting,
    formError,
    resourcePreview,
    resourceFormData,

    handleAddResource,
    handleCloseResourceModal,
    handleFileChange,
    handleResourceSubmit,
    handleRemoveResourcePreview,
    handleDeleteResource,

    setResourceFormData,

    removeResource,
  };
};
