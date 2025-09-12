import React from "react";

interface UserProfileOrganizerFormHeaderProps {
  submitError: string | null;
}

export const UserProfileOrganizerFormHeader: React.FC<
  UserProfileOrganizerFormHeaderProps
> = ({ submitError }) => {
  return (
    <>
      <h2 className="text-primary mb-4 text-xl font-semibold text-grayscale-800 lg:text-3xl">
        Completa tu perfil de Organizador
      </h2>
      {submitError && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 shadow-sm">
          <p className="flex items-center text-sm text-red-700">
            <span className="mr-2">⚠️</span>
            {submitError.includes("URL address")
              ? "Es necesario rellenar las redes sociales correctamente si no tiene use este de aquí: https://organizer.handin.pro"
              : submitError}
          </p>
        </div>
      )}
    </>
  );
};
