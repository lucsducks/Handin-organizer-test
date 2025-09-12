import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, X } from "lucide-react";
import React from "react";

interface RecordingsOrganizerGridHeaderProps {
  searchTerm: string;
  searchInputRef: React.RefObject<HTMLInputElement>;
  total?: number;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onNewRecording: () => void;
}

export const RecordingsOrganizerGridHeader: React.FC<
  RecordingsOrganizerGridHeaderProps
> = ({
  searchTerm,
  searchInputRef,
  total,
  onSearchChange,
  onClearSearch,
  onNewRecording,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1 space-y-1">
        <h1 className="text-xl font-semibold text-grayscale-800 md:text-3xl">
          Mis Grabaciones
        </h1>
        <p className="text-sm text-grayscale-600">
          Gestiona tus grabaciones en la plataforma
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row lg:w-fit lg:justify-start">
        <Button onClick={onNewRecording} className="w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Nueva Grabación
        </Button>
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
    </div>
  );
};
