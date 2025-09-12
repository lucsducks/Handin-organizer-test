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
import { ConferenceTypes } from "@/enums/conference-types.enum";
import { Conference } from "@/models/conferences/conference.model";
import {
  CreateConferenceForm,
  CreateConferenceSeatDto,
} from "@/types/conference/conference.type";
import { dateUtils } from "@/utils/date.utils";
import { AlertCircle, Plus, Trash2, Upload, X } from "lucide-react";
import React from "react";

interface ConferenceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedConference: Conference | null;
  formData: CreateConferenceForm;
  setFormData: (data: CreateConferenceForm) => void;
  formError: string;
  setFormError: (error: string) => void;
  imagePreview: string;
  setImagePreview: (preview: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addSeat: () => void;
  removeSeat: (index: number) => void;
  updateSeat: (index: number, seat: CreateConferenceSeatDto) => void;
  setCategoryId: (categoryId: number) => void;
}

export const ConferenceFormModal = ({
  isOpen,
  onClose,
  selectedConference,
  formData,
  setFormData,
  formError,
  imagePreview,
  setImagePreview,
  isSubmitting,
  onSubmit,
  onFileChange,
  addSeat,
  removeSeat,
  updateSeat,
  setCategoryId,
}: ConferenceFormModalProps) => {
  const handleClearImage = () => {
    setImagePreview("");
    setFormData({ ...formData, banner: null });
  };

  const handleAddSeat = () => {
    addSeat();
  };

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
            {selectedConference ? "Editar Conferencia" : "Nueva Conferencia"}
          </DialogTitle>
          <DialogDescription>
            {selectedConference
              ? "Modifica la información de la conferencia"
              : "Completa la información para crear una nueva conferencia"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4 overflow-y-auto px-2">
          {/* Información general */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-medium text-grayscale-700">
              Información general
            </h2>
            <Input
              label="Título"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Título de la conferencia"
              isRequired
            />
            <Textarea
              label="Descripción"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={5}
              placeholder="Descripción de la conferencia"
              isRequired
            />
            <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-1">
                  <span className="text-sm font-normal text-grayscale-500 md:text-base">
                    Tipo
                  </span>
                  <span className="text-sm text-error md:text-base">*</span>
                </div>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      type: value as ConferenceTypes,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ConferenceTypes.VIRTUAL}>
                      Virtual
                    </SelectItem>
                    <SelectItem value={ConferenceTypes.IN_PERSON}>
                      Presencial
                    </SelectItem>
                    <SelectItem value={ConferenceTypes.HYBRID}>
                      Híbrida
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                label="Fecha y Hora de inicio"
                id="startDate"
                type="datetime-local"
                min={dateUtils.getMinDateTime()}
                value={
                  formData.startDate
                    ? dateUtils.toLocalInput(formData.startDate)
                    : ""
                }
                onChange={(e) => {
                  const utcDate = dateUtils.toUTC(e.target.value);
                  setFormData({
                    ...formData,
                    startDate: utcDate,
                  });
                }}
                isRequired
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row gap-1">
                <span className="text-sm font-normal text-grayscale-500 md:text-base">
                  Banner de la conferencia
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
                    onClick={handleClearImage}
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
          </div>
          {/* Clasificación y Temática */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-medium text-grayscale-700">
              Clasificación y Temática
            </h2>
            <CategoriesList
              selectedSubcategoryIds={formData.subcategories.join(",")}
              onSubcategorySelect={(subcategoryNames, categoryId) => {
                setCategoryId(categoryId);

                setFormData({
                  ...formData,
                  categoryId: categoryId,
                  subcategories: subcategoryNames,
                });
              }}
              data={selectedConference}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-medium text-grayscale-700">
              Entradas y Acceso
            </h2>
            {(formData.type === ConferenceTypes.IN_PERSON ||
              formData.type === ConferenceTypes.HYBRID) && (
              <div className="space-y-4">
                <h3 className="font-medium text-grayscale-600">
                  Entradas Presenciales
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Ubicación"
                    id="location"
                    placeholder="Ubicación de la conferencia"
                    value={formData.location || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    isRequired
                  />
                  <Button
                    type="button"
                    onClick={handleAddSeat}
                    size="sm"
                    className="w-full"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar Entrada
                  </Button>
                  {formData.inPersonPrices &&
                  formData.inPersonPrices.length > 0 ? (
                    formData.inPersonPrices.map((seat, index) => (
                      <div
                        key={index}
                        className="space-y-4 rounded-lg border border-grayscale-300 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="flex size-10 items-center justify-center rounded-lg bg-primary-100 font-medium text-primary-500-main">
                            {index + 1}
                          </h4>
                          {formData.inPersonPrices &&
                            formData.inPersonPrices.length > 1 && (
                              <Button
                                type="button"
                                size="icon"
                                intent="icon"
                                onClick={() => {
                                  removeSeat(index);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Input
                            className="col-span-2"
                            label="Nombre de la entrada"
                            placeholder="Ej: Entrada General"
                            value={seat.name}
                            onChange={(e) =>
                              updateSeat(index, {
                                ...seat,
                                name: e.target.value,
                              })
                            }
                            isRequired
                          />
                          <Input
                            className="col-span-2 sm:col-span-1"
                            label="Precio"
                            type="number"
                            placeholder="0.00"
                            value={seat.price}
                            onChange={(e) =>
                              updateSeat(index, {
                                ...seat,
                                price: parseFloat(e.target.value),
                              })
                            }
                            min="0"
                            step="0.01"
                            isRequired
                          />
                          <Input
                            className="col-span-2 sm:col-span-1"
                            label="Aforo máximo"
                            type="number"
                            placeholder="0"
                            value={seat.maxParticipants?.toString() || ""}
                            onChange={(e) =>
                              updateSeat(index, {
                                ...seat,
                                maxParticipants:
                                  parseInt(e.target.value) || undefined,
                              })
                            }
                            isRequired
                            min="1"
                          />
                          <Textarea
                            className="col-span-2"
                            label="Descripción"
                            placeholder="Descripción de la entrada"
                            value={seat.description || ""}
                            onChange={(e) =>
                              updateSeat(index, {
                                ...seat,
                                description: e.target.value,
                              })
                            }
                            rows={2}
                            isRequired
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-grayscale-400 p-4 text-center">
                      <p className="text-grayscale-500">
                        No tienes entradas presenciales agregadas.
                      </p>
                      <Button
                        type="button"
                        onClick={handleAddSeat}
                        size="sm"
                        intent="secondary"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar Primera Entrada
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {(formData.type === ConferenceTypes.VIRTUAL ||
              formData.type === ConferenceTypes.HYBRID) && (
              <div className="space-y-4">
                <h3 className="font-medium text-grayscale-600">
                  Entrada Virtual
                </h3>
                <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                  <Input
                    label="Precio virtual"
                    type="number"
                    id="virtualPrice"
                    placeholder="0.00"
                    value={formData.virtualPrice?.toString() || ""}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      setFormData({
                        ...formData,
                        virtualPrice: value,
                      });
                    }}
                    min="0"
                    step="0.01"
                    onWheel={(e) => e.currentTarget.blur()}
                    isRequired
                  />
                  <Input
                    label="Aforo virtual"
                    type="number"
                    id="maxVirtualParticipants"
                    value={formData.maxVirtualParticipants?.toString() || ""}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setFormData({
                        ...formData,
                        maxVirtualParticipants: value,
                      });
                    }}
                    min="1"
                    step="1"
                    onWheel={(e) => e.currentTarget.blur()}
                    isRequired
                  />
                </div>
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
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Procesando...
                </>
              ) : selectedConference ? (
                "Guardar Cambios"
              ) : (
                "Crear Conferencia"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
