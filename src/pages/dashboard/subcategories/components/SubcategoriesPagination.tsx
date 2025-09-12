import React from "react";
import { PaginationButton } from "@/components/ui/PaginationButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SubcategoriesPaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export const SubcategoriesPagination: React.FC<SubcategoriesPaginationProps> = ({
  currentPage,
  pageSize,
  totalItems,
  onPreviousPage,
  onNextPage,
  hasPreviousPage,
  hasNextPage,
}) => {
  const getPaginationInfo = () => {
    if (totalItems === 0) {
      return "No hay subcategorías";
    }
    const from = currentPage * pageSize + 1;
    const to = Math.min((currentPage + 1) * pageSize, totalItems);
    return `Mostrando ${from}-${to} de ${totalItems} subcategorías`;
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-grayscale-600">{getPaginationInfo()}</p>
      <div className="flex items-center gap-2">
        <PaginationButton onClick={onPreviousPage} disabled={!hasPreviousPage}>
          <ChevronLeft />
        </PaginationButton>
        <PaginationButton onClick={onNextPage} disabled={!hasNextPage}>
          <ChevronRight />
        </PaginationButton>
      </div>
    </div>
  );
};
