import placeImage from "@/assets/img/profile-default.webp";
import Spinner from "@/components/ui/Spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateResourceForm } from "@/types/recording/resource.type";
import {
  AlertCircle,
  FileText,
  Image,
  Link as LinkIcon,
  Upload,
  Video,
  X,
} from "lucide-react";
import React from "react";

interface RecordingResourcesGridModalProps {
  isOpen: boolean;
  selectedResourceId: number | null;
  resourceFormData: CreateResourceForm;
  formError: string;
  isSubmitting: boolean;
  resourcePreview: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: CreateResourceForm) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePreview: () => void;
}

export const RecordingResourcesGridModal: React.FC<
  RecordingResourcesGridModalProps
> = ({
  isOpen,
  selectedResourceId,
  resourceFormData,
  formError,
  isSubmitting,
  resourcePreview,
  onClose,
  onSubmit,
  onFormDataChange,
  onFileChange,
  onRemovePreview,
}) => {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "Documento":
        return <FileText className="size-5 text-grayscale-600" />;
      case "Video":
        return <Video className="size-5 text-grayscale-600" />;
      case "Enlace":
        return <LinkIcon className="size-5 text-grayscale-600" />;
      case "Imagen":
        return <Image className="size-5 text-grayscale-600" />;
      default:
        return <FileText className="size-5 text-grayscale-600" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[550px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {selectedResourceId ? "Editar Recurso" : "Nuevo Recurso"}
          </DialogTitle>
          <DialogDescription>
            {selectedResourceId
              ? "Modifica los detalles del recurso"
              : "Completa los detalles para crear un nuevo recurso"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid gap-6">
          <div className="grid gap-4">
            <Input
              label="Título"
              id="resourceTitle"
              value={resourceFormData.title}
              onChange={(e) =>
                onFormDataChange({
                  ...resourceFormData,
                  title: e.target.value,
                })
              }
              placeholder="Título del recurso"
              isRequired
            />
            <Textarea
              label="Descripción"
              id="resourceDescription"
              value={resourceFormData.description}
              onChange={(e) =>
                onFormDataChange({
                  ...resourceFormData,
                  description: e.target.value,
                })
              }
              placeholder="Descripción del recurso"
              rows={3}
              isRequired
            />
            <div className="flex flex-col gap-1">
              <div className="flex flex-row gap-1">
                <span className="text-sm font-normal text-grayscale-500 md:text-base">
                  Tipo
                </span>
                <span className="text-sm text-error md:text-base">*</span>
              </div>
              <Select
                value={resourceFormData.type}
                onValueChange={(value) =>
                  onFormDataChange({
                    ...resourceFormData,
                    type: value as
                      | "Documento"
                      | "Video"
                      | "Enlace"
                      | "Imagen"
                      | "Archivo comprimido",
                    file: value === "Enlace" ? null : resourceFormData.file,
                    url: value === "Enlace" ? resourceFormData.url : "",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Documento">Documento</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Imagen">Imagen</SelectItem>
                  <SelectItem value="Archivo comprimido">
                    Archivo comprimido
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {resourceFormData.type === "Enlace" ? (
              <Input
                label="URL"
                id="resourceUrl"
                value={resourceFormData.url || ""}
                onChange={(e) =>
                  onFormDataChange({
                    ...resourceFormData,
                    url: e.target.value,
                  })
                }
                placeholder="Ingresa la URL del recurso"
              />
            ) : (
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-1">
                  <span className="text-sm font-normal text-grayscale-500 md:text-base">
                    Archivo
                  </span>
                  <span className="text-sm text-error md:text-base">*</span>
                </div>
                {resourcePreview || resourceFormData.file ? (
                  <div className="relative">
                    {resourceFormData.type === "Imagen" ? (
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <img
                          src={resourcePreview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = placeImage;
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-grayscale-400 p-6 transition-colors">
                        {getResourceIcon(resourceFormData.type)}
                        <span className="text-sm text-grayscale-600">
                          {resourceFormData.file?.name || "Archivo cargado"}
                        </span>
                      </div>
                    )}
                    <Button
                      type="button"
                      size="icon"
                      intent="icon"
                      className="absolute right-1 top-1 bg-white"
                      onClick={onRemovePreview}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="hover:border-primary flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-grayscale-400 p-6 transition-colors hover:bg-grayscale-100">
                    <Upload className="h-8 w-8 text-grayscale-600" />
                    <span className="text-sm text-grayscale-600">
                      {resourceFormData.type === "Imagen"
                        ? "Haz click para subir una imagen"
                        : resourceFormData.type === "Documento"
                          ? "Haz click para subir un documento"
                          : resourceFormData.type === "Video"
                            ? "Haz click para subir un video"
                            : resourceFormData.type === "Archivo comprimido"
                              ? "Haz click para subir un archivo comprimido"
                              : "Haz click para subir un archivo"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={onFileChange}
                      accept={
                        resourceFormData.type === "Imagen"
                          ? ".jpg,.jpeg,.png,.gif"
                          : resourceFormData.type === "Documento"
                            ? ".pdf,.docx,.xlsx,.pptx,.odt,.ods,.odp,.txt,.rtf"
                            : resourceFormData.type === "Video"
                              ? ".avi,.mp4,.mov,.flv,.mkv"
                              : resourceFormData.type === "Archivo comprimido"
                                ? ".zip,.rar,.tar,.7z"
                                : "*"
                      }
                    />
                    <p className="text-xs text-grayscale-600">
                      {resourceFormData.type === "Imagen"
                        ? "JPG, JPEG, PNG, GIF hasta 5MB"
                        : resourceFormData.type === "Documento"
                          ? "PDF, DOCX, XLSX, PPTX, ODT, ODS, ODP, TXT, RTF hasta 10MB"
                          : resourceFormData.type === "Video"
                            ? "AVI, MP4, MOV, FLV, MKV hasta 500MB"
                            : resourceFormData.type === "Archivo comprimido"
                              ? "ZIP, RAR, TAR, 7Z hasta 100MB"
                              : "Archivos hasta 100MB"}
                    </p>
                  </label>
                )}
              </div>
            )}

            {formError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              intent="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner />
                  Procesando
                </>
              ) : selectedResourceId ? (
                "Guardar Cambios"
              ) : (
                "Crear Recurso"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
