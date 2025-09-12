import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import React from "react";

interface RecordingsAdminEmptyStateProps {
  showUnverifiedOnly: boolean;
  searchTerm: string;
  onViewAllRecordings: () => void;
}

export const RecordingsAdminEmptyState: React.FC<
  RecordingsAdminEmptyStateProps
> = ({ showUnverifiedOnly, searchTerm, onViewAllRecordings }) => {
  const getTitle = () => {
    if (showUnverifiedOnly)
      return "No hay grabaciones pendientes de verificación";
    if (searchTerm) return "No se encontraron resultados";
    return "No hay grabaciones";
  };

  const getDescription = () => {
    if (showUnverifiedOnly) return "Todas las grabaciones han sido verificadas";
    if (searchTerm) return "Intenta con otros términos de búsqueda";
    return "Comienza creando una nueva grabación";
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-grayscale-400 bg-white p-12 text-center">
      <Video className="size-12 text-grayscale-600" />
      <h3 className="mt-2 text-sm font-medium text-grayscale-700">
        {getTitle()}
      </h3>
      <p className="mt-1 text-sm text-grayscale-600">{getDescription()}</p>
      {showUnverifiedOnly && (
        <Button
          intent="secondary"
          className="mt-4"
          onClick={onViewAllRecordings}
        >
          Ver todas las grabaciones
        </Button>
      )}
    </div>
  );
};
