import Spinner from "@/components/ui/Spinner";
import React from "react";

export const RecordingResourcesGridLoadingState: React.FC = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <Spinner />

      <div className="text-lg text-muted-foreground">Cargando recursos...</div>
    </div>
  );
};
