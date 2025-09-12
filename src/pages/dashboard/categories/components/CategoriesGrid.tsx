import Spinner from "@/components/ui/Spinner";
import React from "react";
import { useCategoriesLogic } from "../hooks/useCategoriesLogic";
import { CategoriesEmptyState } from "./CategoriesEmptyState";
import { CategoriesHeader } from "./CategoriesHeader";
import { CategoriesPagination } from "./CategoriesPagination";
import { CategoriesSearch } from "./CategoriesSearch";
import { CategoriesTable } from "./CategoriesTable";
import { CategoryModal } from "./CategoryModal";

export const CategoriesGrid: React.FC = () => {
  const {
    categories,
    pagination,
    isLoading,
    selectedCategory,
    isModalOpen,
    searchTerm,
    formData,
    formError,
    isSubmitting,
    currentPage,
    pageSize,
    setSearchTerm,
    setFormData,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    loadCategories,
  } = useCategoriesLogic();

  const hasNextPage = () => {
    if (!pagination) return false;
    return (currentPage + 1) * pageSize < pagination.total;
  };

  const hasPreviousPage = () => {
    return currentPage > 0;
  };

  const goToNextPage = () => {
    if (hasNextPage()) {
      loadCategories(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (hasPreviousPage()) {
      loadCategories(currentPage - 1);
    }
  };

  if (isLoading && !categories.length) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-row gap-2 text-lg text-grayscale-600">
          <Spinner />
          Cargando categorías...
        </div>
      </div>
    );
  }

  return (
    <>
      <CategoriesHeader onAddCategory={() => handleOpenModal()} />

      <CategoriesSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultsCount={pagination ? categories.length : undefined}
      />

      {categories.length === 0 ? (
        <CategoriesEmptyState
          hasSearchTerm={!!searchTerm}
          onAddCategory={() => handleOpenModal()}
        />
      ) : (
        <>
          <CategoriesTable
            categories={categories}
            onEditCategory={handleOpenModal}
          />

          <CategoriesPagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={pagination?.total || 0}
            onPreviousPage={goToPreviousPage}
            onNextPage={goToNextPage}
            hasPreviousPage={hasPreviousPage()}
            hasNextPage={hasNextPage()}
          />
        </>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        selectedCategory={selectedCategory}
        formData={formData}
        formError={formError}
        isSubmitting={isSubmitting}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        onFormChange={setFormData}
      />
    </>
  );
};

export default CategoriesGrid;
