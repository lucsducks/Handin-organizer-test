import { PaginationButton } from "@/components/ui/PaginationButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface RecordingsOrganizerGridPaginationProps {
  getPaginationInfo: () => string;
  hasPreviousPage: () => boolean;
  hasNextPage: () => boolean;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}

export const RecordingsOrganizerGridPagination: React.FC<
  RecordingsOrganizerGridPaginationProps
> = ({
  getPaginationInfo,
  hasPreviousPage,
  hasNextPage,
  goToPreviousPage,
  goToNextPage,
}) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">{getPaginationInfo()}</p>
      <div className="flex items-center gap-2">
        <PaginationButton
          onClick={goToPreviousPage}
          disabled={!hasPreviousPage()}
        >
          <ChevronLeft />
        </PaginationButton>
        <PaginationButton onClick={goToNextPage} disabled={!hasNextPage()}>
          <ChevronRight />
        </PaginationButton>
      </div>
    </div>
  );
};
