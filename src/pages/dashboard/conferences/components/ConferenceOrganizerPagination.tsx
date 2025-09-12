import { PaginationButton } from "@/components/ui/PaginationButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ConferenceOrganizerPaginationProps {
  getPaginationInfo: () => string;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  hasPreviousPage: () => boolean;
  hasNextPage: () => boolean;
}

export const ConferenceOrganizerPagination = ({
  getPaginationInfo,
  goToPreviousPage,
  goToNextPage,
  hasPreviousPage,
  hasNextPage,
}: ConferenceOrganizerPaginationProps) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-grayscale-600">{getPaginationInfo()}</p>
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
