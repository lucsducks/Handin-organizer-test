import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { RefObject } from "react";

interface ConferenceOrganizerFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchInputRef: RefObject<HTMLInputElement>;
  total?: number;
}

export const ConferenceOrganizerFilters = ({
  searchTerm,
  setSearchTerm,
  searchInputRef,
  total,
}: ConferenceOrganizerFiltersProps) => {
  const handleClearSearch = () => {
    setSearchTerm("");
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
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar conferencias"
          className="w-full"
        />
        {searchTerm && (
          <Button
            className="mt-[6px] size-8 md:mt-[10px]"
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
          {total !== undefined && <span> - {total} resultados</span>}
        </p>
      )}
    </div>
  );
};
