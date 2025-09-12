import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, Plus } from "lucide-react";
import React from "react";

interface RecordingResourcesGridHeaderProps {
  onNavigateToStudentView: () => void;
  onAddResource: () => void;
  onViewComments: () => void;
}

export const RecordingResourcesGridHeader: React.FC<
  RecordingResourcesGridHeaderProps
> = ({ onNavigateToStudentView, onAddResource, onViewComments }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1 space-y-1">
        <h1 className="text-xl font-semibold text-grayscale-800 md:text-3xl">
          Contenido de la Grabación
        </h1>
        <p className="text-sm text-grayscale-600">
          Organiza los recursos de tu grabación
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row lg:w-fit lg:justify-start">
        <Button
          intent="secondary"
          onClick={onNavigateToStudentView}
          className="w-full sm:w-auto"
        >
          <Eye className="size-4" />
          Vista Participante
        </Button>
        <Button
          intent="secondary"
          onClick={onViewComments}
          className="relative w-full sm:w-auto"
        >
          <MessageSquare className="size-4" />
          Comentarios
        </Button>
        <Button onClick={onAddResource} className="w-full sm:w-auto">
          <Plus className="size-4" />
          Nuevo Recurso
        </Button>
      </div>
    </div>
  );
};
