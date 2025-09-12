import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CategoriesHeaderProps {
  onAddCategory: () => void;
}

export const CategoriesHeader: React.FC<CategoriesHeaderProps> = ({ onAddCategory }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1 space-y-1">
        <h1 className="text-xl font-semibold text-grayscale-800 md:text-3xl">
          Categorías
        </h1>
        <p className="text-sm text-grayscale-600">
          Gestiona las categorías de tu plataforma
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row lg:w-fit lg:justify-start">
        <Button onClick={onAddCategory} className="w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Nueva Categoría
        </Button>
      </div>
    </div>
  );
};
