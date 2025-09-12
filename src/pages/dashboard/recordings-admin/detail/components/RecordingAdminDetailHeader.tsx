import { Button } from "@/components/ui/button";
import { Eye, MessageSquare } from "lucide-react";
import React from "react";

interface RecordingAdminDetailHeaderProps {
  onNavigateToStudentView: () => void;
  renderVerificationButton: () => React.ReactNode;
  onViewComments: () => void;
}

export const RecordingAdminDetailHeader: React.FC<
  RecordingAdminDetailHeaderProps
> = ({ onNavigateToStudentView, renderVerificationButton, onViewComments }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-grayscale-800 lg:text-3xl">
          Contenido de la Grabación
        </h1>
      </div>
      <div className="flex flex-col gap-4 md:flex-row lg:w-fit lg:justify-start">
        <Button
          intent="secondary"
          size="sm"
          onClick={onNavigateToStudentView}
          className="w-full sm:w-auto"
        >
          <Eye className="size-4" />
          Vista Participante
        </Button>
        <Button
          intent="secondary"
          size="sm"
          onClick={onViewComments}
          className="w-full sm:w-auto"
        >
          <MessageSquare className="size-4" />
          Comentarios
        </Button>

        {renderVerificationButton()}
      </div>
    </div>
  );
};
