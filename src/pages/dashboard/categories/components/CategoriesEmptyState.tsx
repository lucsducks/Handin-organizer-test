import React from "react";
import { Button } from "@/components/ui/button";
import { FolderTree, Plus } from "lucide-react";

interface CategoriesEmptyStateProps {
  hasSearchTerm: boolean;
  onAddCategory: () => void;
}

export const CategoriesEmptyState: React.FC<CategoriesEmptyStateProps> = ({
  hasSearchTerm,
  onAddCategory,
}) => {
  return (
    <div className="flex h-60 flex-col items-center justify-center rounded-lg border-2 border-dashed border-grayscale-400 bg-white p-4 text-center">
      <FolderTree className="size-12 text-grayscale-600" />
      <h3 className="mt-2 text-sm font-medium text-grayscale-700">
        {hasSearchTerm ? "No se encontraron resultados" : "No hay categorías"}
      </h3>
      <p className="mt-1 text-sm text-grayscale-600">
        {hasSearchTerm
          ? "Intenta con otros términos de búsqueda"
          : "Comienza creando una nueva categoría"}
      </p>
      {!hasSearchTerm && (
        <Button onClick={onAddCategory} className="mt-6">
          <Plus className="h-4 w-4" />
          Nueva Categoría
        </Button>
      )}
    </div>
  );
};
