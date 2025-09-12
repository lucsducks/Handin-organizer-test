import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import React from "react";

interface RecordingResourcesGridEmptyStateProps {
  onAddResource: () => void;
}

export const RecordingResourcesGridEmptyState: React.FC<
  RecordingResourcesGridEmptyStateProps
> = ({ onAddResource }) => {
  return (
    <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed border-grayscale-400 bg-white p-4 text-center">
      <Upload className="size-12 text-grayscale-600" />
      <h3 className="mt-2 text-sm font-medium text-grayscale-600">
        No hay recursos
      </h3>
      <p className="mt-1 text-sm text-grayscale-600">
        Comienza creando una nuevo recurso para tu grabación
      </p>
      <Button onClick={onAddResource} className="mt-4">
        <Plus className="h-4 w-4" />
        Nuevo recurso
      </Button>
    </div>
  );
};
