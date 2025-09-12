import { Button } from "@/components/ui/button";
import { GraduationCap, Plus, Search } from "lucide-react";
import React from "react";

interface OrganizerListEmptyStateProps {
  searchTerm: string;
  hasData?: boolean;
  onClearSearch?: () => void;
  onCreateNew?: () => void;
}

export const OrganizerListEmptyState: React.FC<
  OrganizerListEmptyStateProps
> = ({ searchTerm, hasData = false, onClearSearch, onCreateNew }) => {
  if (searchTerm && hasData) {
    return (
      <div className="flex h-60 flex-col items-center justify-center rounded-lg border-2 border-dashed border-grayscale-400 bg-white p-4 text-center">
        <Search className="size-12 text-grayscale-400" />
        <h3 className="mt-4 text-lg font-medium text-grayscale-700">
          No se encontraron resultados
        </h3>
        <p className="mt-2 max-w-sm text-sm text-grayscale-600">
          No encontramos Organizadores que coincidan con "{searchTerm}". Intenta
          con otros términos de búsqueda.
        </p>
        {onClearSearch && (
          <Button onClick={onClearSearch} className="mt-4">
            Limpiar búsqueda
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-60 flex-col items-center justify-center rounded-lg border-2 border-dashed border-grayscale-400 bg-white p-4 text-center">
      <GraduationCap className="size-12 text-grayscale-400" />
      <h3 className="mt-4 text-lg font-medium text-grayscale-700">
        No hay Organizadores registrados
      </h3>
      <p className="mt-2 max-w-sm text-sm text-grayscale-600">
        La plataforma aún no cuenta con Organizadores registrados. Invita a
        profesionales a unirse a tu plataforma.
      </p>

      {onCreateNew && (
        <Button onClick={onCreateNew} className="mt-4">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Organizador
        </Button>
      )}

      <div className="mt-6 max-w-md rounded-lg bg-blue-50 p-4">
        <p className="text-xs text-blue-700">
          💡 Los Organizadores pueden registrarse en la plataforma y luego ser
          verificados por el administrador.
        </p>
      </div>
    </div>
  );
};
