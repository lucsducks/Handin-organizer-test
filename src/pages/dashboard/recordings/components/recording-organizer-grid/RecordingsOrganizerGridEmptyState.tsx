import { Button } from "@/components/ui/button";
import { Book, Plus } from "lucide-react";
import React from "react";

interface RecordingsOrganizerGridEmptyStateProps {
  searchTerm: string;
  onNewRecording: () => void;
}

export const RecordingsOrganizerGridEmptyState: React.FC<
  RecordingsOrganizerGridEmptyStateProps
> = ({ searchTerm, onNewRecording }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-grayscale-400 bg-white p-12 text-center">
      <Book className="size-12 text-grayscale-600" />
      <h3 className="mt-2 text-sm font-medium text-grayscale-700">
        {searchTerm ? "No se encontraron resultados" : "No hay grabaciones"}
      </h3>
      <p className="mt-1 text-sm text-grayscale-600">
        {searchTerm
          ? "Intenta con otros términos de búsqueda"
          : "Comienza creando una nueva grabación"}
      </p>
      {!searchTerm && (
        <Button onClick={onNewRecording} className="mt-6">
          <Plus className="h-4 w-4" />
          Nueva Grabación
        </Button>
      )}
    </div>
  );
};
