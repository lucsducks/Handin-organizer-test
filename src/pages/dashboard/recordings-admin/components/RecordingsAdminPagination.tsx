import { PaginationButton } from "@/components/ui/PaginationButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface RecordingsAdminPaginationProps {
  getPaginationInfo: () => string;
  hasNextPage: () => boolean;
  hasPreviousPage: () => boolean;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

export const RecordingsAdminPagination: React.FC<
  RecordingsAdminPaginationProps
> = ({
  getPaginationInfo,
  hasNextPage,
  hasPreviousPage,
  goToNextPage,
  goToPreviousPage,
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
