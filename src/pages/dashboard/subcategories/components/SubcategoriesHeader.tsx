import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SubcategoriesHeaderProps {
  categoryName: string;
  onAddSubcategory: () => void;
}

export const SubcategoriesHeader: React.FC<SubcategoriesHeaderProps> = ({
  categoryName,
  onAddSubcategory,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1 space-y-1">
        <h1 className="text-xl font-semibold text-grayscale-800 md:text-3xl">
          {categoryName}
        </h1>
        <p className="text-sm text-grayscale-600">
          Gestiona las subcategorías de {categoryName}
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row lg:w-fit lg:justify-start">
        <Button onClick={onAddSubcategory} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Subcategoría
        </Button>
      </div>
    </div>
  );
};
