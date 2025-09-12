import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FilterX, Search, X } from "lucide-react";
import React from "react";

interface RecordingsAdminFiltersProps {
  searchTerm: string;
  showUnverifiedOnly: boolean;
  total?: number;
  searchInputRef: React.RefObject<HTMLInputElement>;
  onSearchChange: (value: string) => void;
  onUnverifiedToggle: (checked: boolean) => void;
  onClearSearch: () => void;
}

export const RecordingsAdminFilters: React.FC<RecordingsAdminFiltersProps> = ({
  searchTerm,
  showUnverifiedOnly,
  total,
  searchInputRef,
  onSearchChange,
  onUnverifiedToggle,
  onClearSearch,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row lg:w-fit lg:justify-start">
      <label
        htmlFor="unverified-only"
        className="flex h-10 cursor-pointer items-center space-x-2 rounded-xl border border-grayscale-400 bg-grayscale-100 px-3 md:h-12"
      >
        <Switch
          id="unverified-only"
          checked={showUnverifiedOnly}
          onCheckedChange={onUnverifiedToggle}
        />
        <div className="flex items-center gap-2 text-sm">
          <FilterX className="h-4 w-4 min-w-4 text-orange-600" />
          <span className="text-grayscale-600">Solo pendientes</span>
        </div>
      </label>
      <div>
        <div className="flex flex-row gap-1">
          <Input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            icon={<Search />}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar grabaciones"
            className="w-full"
          />
          {searchTerm && (
            <Button
              className="mt-[6px] size-8 md:mt-3"
              size="icon"
              intent="icon"
              onClick={onClearSearch}
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
    </div>
  );
};
