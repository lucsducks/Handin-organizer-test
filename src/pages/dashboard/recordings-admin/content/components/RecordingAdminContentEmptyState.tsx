import React from "react";

export const RecordingAdminContentEmptyState: React.FC = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="text-lg text-grayscale-600">
        No se encontró el contenido de la grabación
      </div>
    </div>
  );
};
