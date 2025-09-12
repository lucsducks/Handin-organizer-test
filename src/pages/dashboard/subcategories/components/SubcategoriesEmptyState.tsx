import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Tag } from "lucide-react";

interface SubcategoriesEmptyStateProps {
  hasSearchTerm: boolean;
  onAddSubcategory: () => void;
}

export const SubcategoriesEmptyState: React.FC<SubcategoriesEmptyStateProps> = ({
  hasSearchTerm,
  onAddSubcategory,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-grayscale-400 bg-white p-12 text-center">
      <Tag className="size-12 text-grayscale-600" />
      <h3 className="mt-2 text-sm font-medium text-grayscale-700">
        {hasSearchTerm ? "No se encontraron resultados" : "No hay subcategorías"}
      </h3>
      <p className="mt-1 text-sm text-grayscale-600">
        {hasSearchTerm
          ? "Intenta con otros términos de búsqueda"
          : "Comienza creando una nueva subcategoría"}
      </p>
      {!hasSearchTerm && (
        <Button onClick={onAddSubcategory} className="mt-6">
          <Plus className="size-4" />
          Nueva Subcategoría
        </Button>
      )}
    </div>
  );
};
