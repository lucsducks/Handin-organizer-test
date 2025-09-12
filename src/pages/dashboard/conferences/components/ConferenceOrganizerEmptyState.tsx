import { Button } from "@/components/ui/button";
import { MonitorPlay, Plus } from "lucide-react";

interface ConferenceOrganizerEmptyStateProps {
  searchTerm: string;
  onCreateConference: () => void;
}

export const ConferenceOrganizerEmptyState = ({
  searchTerm,
  onCreateConference,
}: ConferenceOrganizerEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-grayscale-400 bg-white p-12 text-center">
      <MonitorPlay className="size-12 text-grayscale-600" />
      <h3 className="mt-2 text-sm font-medium text-grayscale-700">
        {searchTerm ? "No se encontraron resultados" : "No hay conferencias"}
      </h3>
      <p className="mt-1 text-sm text-grayscale-600">
        {searchTerm
          ? "Intenta con otros términos de búsqueda"
          : "Comienza creando una nueva conferencia"}
      </p>
      {!searchTerm && (
        <Button onClick={onCreateConference} className="mt-6">
          <Plus className="h-4 w-4" />
          Nueva Conferencia
        </Button>
      )}
    </div>
  );
};
