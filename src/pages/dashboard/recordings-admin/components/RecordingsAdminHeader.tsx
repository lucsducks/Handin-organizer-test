import React from "react";

export const RecordingsAdminHeader: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1 space-y-1">
        <h1 className="text-xl font-semibold text-grayscale-800 md:text-3xl">
          Grabaciones
        </h1>
        <p className="text-sm text-grayscale-600">
          Gestiona las grabaciones en la plataforma
        </p>
      </div>
    </div>
  );
};
