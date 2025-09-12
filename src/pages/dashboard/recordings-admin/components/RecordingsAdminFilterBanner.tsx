import { Button } from "@/components/ui/button";
import { FilterX, X } from "lucide-react";
import React from "react";

interface RecordingsAdminFilterBannerProps {
  showUnverifiedOnly: boolean;
  onRemoveFilter: () => void;
}

export const RecordingsAdminFilterBanner: React.FC<
  RecordingsAdminFilterBannerProps
> = ({ showUnverifiedOnly, onRemoveFilter }) => {
  if (!showUnverifiedOnly) return null;

  return (
    <div className="flex flex-col items-center gap-2 rounded-lg bg-orange-50 p-2 text-sm text-orange-600 sm:flex-row">
      <div className="flex flex-row gap-2">
        <FilterX className="h-4 w-4 min-w-4" />
        <span>Mostrando solo grabaciones pendientes de verificación</span>
      </div>
      <Button
        size="sm"
        intent="tertiary"
        className="h-8 text-orange-600 hover:bg-orange-100 hover:text-orange-700"
        onClick={onRemoveFilter}
      >
        <X className="h-4 w-4" />
        Quitar filtro
      </Button>
    </div>
  );
};
