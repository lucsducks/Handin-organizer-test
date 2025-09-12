import Spinner from "@/components/ui/Spinner";
import React from "react";

export const RecordingsOrganizerGridLoadingState: React.FC = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="flex flex-row gap-2 text-lg text-grayscale-600">
        <Spinner />
        Cargando grabaciones...
      </div>
    </div>
  );
};
