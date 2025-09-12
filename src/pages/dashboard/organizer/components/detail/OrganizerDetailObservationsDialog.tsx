import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import React from "react";

interface OrganizerDetailObservationsDialogProps {
  organizer: any;
  formatDate: (date: string) => string;
}

export const OrganizerDetailObservationsDialog: React.FC<
  OrganizerDetailObservationsDialogProps
> = ({ organizer, formatDate }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button intent="secondary" size="sm">
          <Eye className="h-4 w-4" />
          Observaciones
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Observaciones del Organizador</DialogTitle>
          <DialogDescription>
            Información adicional y notas sobre el Organizador.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="font-medium text-grayscale-800">
              Estado de Verificación
            </h4>
            <p className="text-sm text-grayscale-600">
              {organizer.verified
                ? "El Organizador ha sido verificado y cumple con todos los requisitos necesarios."
                : "El Organizador aún no ha sido verificado o está en proceso de verificación."}
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-medium text-grayscale-800">Documentación</h4>
            <p className="text-sm text-grayscale-600">
              {organizer.cv
                ? "Brochure disponible para revisión"
                : "Brochure pendiente de carga"}
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-medium text-grayscale-800">
              Fecha de Registro
            </h4>
            <p className="text-sm text-grayscale-600">
              Registrado el {formatDate(organizer.createdAt)}
            </p>
            <p className="text-sm text-grayscale-600">
              Última actualización: {formatDate(organizer.updatedAt)}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
