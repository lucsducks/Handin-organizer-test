import CategoriesList from "@/components/CategoriesList";
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
import { RecordingStatus } from "@/enums/recording-status.enum";
import { CreateRecordingOrganizerForm } from "@/types/recording/recording.type";
import { AlertCircle, Upload, X } from "lucide-react";
import React from "react";

interface RecordingsOrganizerGridModalProps {
  isOpen: boolean;
  selectedRecording: any;
  formData: CreateRecordingOrganizerForm;
  formError: string;
  isSubmitting: boolean;
  imagePreview: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: Partial<CreateRecordingOrganizerForm>) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export const RecordingsOrganizerGridModal: React.FC<
  RecordingsOrganizerGridModalProps
> = ({
  isOpen,
  selectedRecording,
  formData,
  formError,
  isSubmitting,
  imagePreview,
  onClose,
  onSubmit,
  onFormDataChange,
  onFileChange,
  onRemoveImage,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="h-[90vh] sm:max-w-[725px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {selectedRecording ? "Editar Grabación" : "Nueva Grabación"}
          </DialogTitle>
          <DialogDescription>
            {selectedRecording
              ? "Modifica los detalles de la grabación"
              : "Completa los detalles para crear una nueva grabación"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4 overflow-y-auto px-2">
          <div className="grid gap-4">
            <h2 className="text-xl font-medium text-grayscale-700">
              Información general
            </h2>
            <Input
              label="Título"
              value={formData.title}
              onChange={(e) => onFormDataChange({ title: e.target.value })}
              placeholder="Título de la grabación"
              isRequired
            />
            <Textarea
              label="Descripción"
              value={formData.description}
              onChange={(e) =>
                onFormDataChange({ description: e.target.value })
              }
              rows={5}
              placeholder="Descripción de la grabación"
              isRequired
            />
            <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
              <Input
                label="Precio"
                type="text"
                value={formData.price.toString()}
                onChange={(e) => {
                  const value = e.target.value;
                  const numericValue = value === "" ? 0 : parseFloat(value);
                  onFormDataChange({
                    price: isNaN(numericValue) ? 0 : numericValue,
                  });
                }}
                placeholder="0.00"
                isRequired
              />
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-1">
                  <span className="text-sm font-normal text-grayscale-500 md:text-base">
                    Estado
                  </span>
                  <span className="text-sm text-error md:text-base">*</span>
                </div>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    onFormDataChange({
                      status: value as RecordingStatus,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={RecordingStatus.PUBLISHED}>
                      Publicado
                    </SelectItem>
                    <SelectItem value={RecordingStatus.DRAFT}>
                      Borrador
                    </SelectItem>
                    <SelectItem value={RecordingStatus.INACTIVE}>
                      Inactivo
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Textarea
              label="Requisitos (dividido por comas)"
              value={formData.requirements.join(",\n")}
              onChange={(e) =>
                onFormDataChange({
                  requirements: e.target.value.split(",\n"),
                })
              }
              rows={5}
              placeholder="Requisito 1&#10;Requisito 2&#10;Requisito 3"
              isRequired
            />
            <Textarea
              label="Aprendizajes (dividido por comas)"
              value={formData.learnings.join(",\n")}
              onChange={(e) =>
                onFormDataChange({
                  learnings: e.target.value.split(",\n"),
                })
              }
              rows={5}
              placeholder="Aprendizaje 1&#10;Aprendizaje 2&#10;Aprendizaje 3"
              isRequired
            />
            <div className="flex flex-col gap-1">
              <div className="flex flex-row gap-1">
                <span className="text-sm font-normal text-grayscale-500 md:text-base">
                  Banner de la grabación
                </span>
                <span className="text-sm text-error md:text-base">*</span>
              </div>
              {imagePreview ? (
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <Button
                    type="button"
                    size="icon"
                    intent="icon"
                    className="absolute right-2 top-2"
                    onClick={onRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="hover:border-primary flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-grayscale-400 p-6 transition-colors hover:bg-grayscale-100">
                  <Upload className="size-8 text-grayscale-600" />
                  <span className="text-sm text-grayscale-600">
                    Haz click para subir una imagen
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={onFileChange}
                  />
                  <p className="text-xs text-grayscale-600">
                    PNG, JPG, GIF hasta 2MB
                  </p>
                </label>
              )}
            </div>
            <h2 className="text-xl font-medium text-grayscale-700">
              Clasificación y Temática
            </h2>
            <CategoriesList
              selectedSubcategoryIds={formData.subcategories.join(",")}
              onSubcategorySelect={(subcategoryNames, categoryId) => {
                onFormDataChange({
                  categoryId: categoryId || 0,
                  subcategories: subcategoryNames,
                });
              }}
              data={selectedRecording}
            />
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
              ) : selectedRecording ? (
                "Guardar Cambios"
              ) : (
                "Crear Grabación"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
