import React from "react";
import { Organizer } from "@/models/organizer/organizer.model";
import { OrganizerListCard } from "./OrganizerListCard";

interface OrganizerListGridProps {
  organizers: Organizer[];
  onNavigateToOrganizer: (organizerId: number) => void;
  isLoading?: boolean;
}

export const OrganizerListGrid: React.FC<OrganizerListGridProps> = ({
  organizers,
  onNavigateToOrganizer,
  isLoading = false,
}) => {


  return (
    <div className="space-y-4">
      {isLoading && organizers.length > 0 && (
        <div className="flex items-center justify-center py-2">
          <div className="flex items-center gap-2 text-sm text-grayscale-600">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span>Actualizando datos...</span>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {organizers.map((organizer) => (
          <OrganizerListCard
            key={organizer.id}
            organizer={organizer}
            onNavigateToOrganizer={onNavigateToOrganizer}
          />
        ))}
      </div>

      {/* Información adicional */}
      {organizers.length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-grayscale-500">
            Mostrando {organizers.length} Organizador{organizers.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};