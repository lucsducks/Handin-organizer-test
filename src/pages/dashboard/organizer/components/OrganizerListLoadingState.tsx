import React from "react";

export const OrganizerListLoadingState: React.FC = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="text-lg text-muted-foreground">Cargando Organizadores...</div>
    </div>
  );
};
