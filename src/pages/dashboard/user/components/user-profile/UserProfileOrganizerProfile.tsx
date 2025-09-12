import OrganizerProfile from "@/components/organizer-profile/components/OrganizerProfile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Eye } from "lucide-react";
import React from "react";

// import EditOrganizerDialog from "../EditOrganizerModal";

interface UserProfileOrganizerProfileProps {
  organizer: any;
  formatDate: (date: string) => string;
  handleDownloadCV: () => void;
}

export const UserProfileOrganizerProfile: React.FC<
  UserProfileOrganizerProfileProps
> = ({ organizer, formatDate, handleDownloadCV }) => {
  if (!organizer) {
    return <p>No se encontró información del Organizador.</p>;
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-grayscale-800 lg:text-3xl">
          Perfil de Organizador
        </h1>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" intent="secondary">
                <Eye className="size-4" />
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
                  <h4 className="font-medium text-grayscale-800">
                    Documentación
                  </h4>
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
          {organizer.cv && (
            <Button size="sm" onClick={handleDownloadCV}>
              <Download className="size-4" />
              Descargar Brochure
            </Button>
          )}
          {/* {organizer.verified && <EditOrganizerDialog organizer={organizer} />} */}
        </div>
      </div>
      <OrganizerProfile organizer={organizer} />
    </div>
  );
};
