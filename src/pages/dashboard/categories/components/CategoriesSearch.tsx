import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface CategoriesSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  resultsCount?: number;
}

export const CategoriesSearch: React.FC<CategoriesSearchProps> = ({
  searchTerm,
  onSearchChange,
  resultsCount,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClearSearch = () => {
    onSearchChange("");
    searchInputRef.current?.focus();
  };

  return (
    <div>
      <div className="flex flex-row gap-1">
        <Input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          icon={<Search />}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar categorías"
          className="w-full"
        />
        {searchTerm && (
          <Button
            className="mt-[6px] size-8 md:mt-3"
            size="icon"
            intent="icon"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {searchTerm && (
        <p className="mt-2 text-xs text-grayscale-600">
          Buscando: "{searchTerm}"
          {resultsCount !== undefined && <span> - {resultsCount} resultados</span>}
        </p>
      )}
    </div>
  );
};