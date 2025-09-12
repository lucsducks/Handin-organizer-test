import Spinner from "@/components/ui/Spinner";
import React from "react";

export const RecordingAdminDetailLoadingState: React.FC = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="flex items-center gap-2 text-grayscale-600">
        <Spinner />
        Cargando información de la grabación...
      </div>
    </div>
  );
};
