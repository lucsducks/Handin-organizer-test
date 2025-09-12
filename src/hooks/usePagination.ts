import { useCallback, useState } from "react";

interface UsePaginationProps {
  total: number;
  pageSize: number;
  loadData: (page: number, search: string) => void;
  debouncedSearchTerm: string;
}

export const usePagination = ({
  total,
  pageSize,
  loadData,
  debouncedSearchTerm,
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const hasNextPage = useCallback(() => {
    return (currentPage + 1) * pageSize < total;
  }, [currentPage, pageSize, total]);

  const hasPreviousPage = useCallback(() => {
    return currentPage > 0;
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    if (hasNextPage()) {
      const nextPage = currentPage + 1;
      loadData(nextPage, debouncedSearchTerm);
      setCurrentPage(nextPage);
    }
  }, [currentPage, debouncedSearchTerm, hasNextPage, loadData]);

  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage()) {
      const prevPage = currentPage - 1;
      loadData(prevPage, debouncedSearchTerm);
      setCurrentPage(prevPage);
    }
  }, [currentPage, debouncedSearchTerm, hasPreviousPage, loadData]);

  const getPaginationInfo = useCallback(() => {
    if (!total || total === 0) {
      return "No hay resultados";
    }

    const from = currentPage * pageSize + 1;
    const to = Math.min((currentPage + 1) * pageSize, total);
    return `Mostrando ${from}-${to} de ${total} resultados`;
  }, [currentPage, pageSize, total]);

  return {
    currentPage,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    getPaginationInfo,
  };
};
