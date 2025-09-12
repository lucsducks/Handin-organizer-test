import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface SubcategoriesSearchProps {
  searchTerm: string;
  debouncedSearchTerm: string;
  totalResults?: number;
  onSearchChange: (value: string) => void;
}

export const SubcategoriesSearch: React.FC<SubcategoriesSearchProps> = ({
  searchTerm,
  debouncedSearchTerm,
  totalResults,
  onSearchChange,
}) => {
  return (
    <div>
      <div className="flex flex-row gap-1">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar subcategorías..."
          className="w-full"
        />
        {searchTerm && (
          <Button
            className="mt-[6px] size-8 md:mt-3"
            size="icon"
            intent="icon"
            onClick={() => onSearchChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {debouncedSearchTerm && (
        <p className="mt-2 text-xs text-grayscale-600">
          Buscando: "{debouncedSearchTerm}"
          {totalResults !== undefined && <span> - {totalResults} resultados</span>}
        </p>
      )}
    </div>
  );
};
