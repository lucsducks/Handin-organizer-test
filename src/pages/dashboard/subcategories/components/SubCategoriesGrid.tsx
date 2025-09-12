import Spinner from "@/components/ui/Spinner";
import React from "react";
import { useSubcategoriesLogic } from "../hooks/useSubcategoriesLogic";
import { SubcategoriesEmptyState } from "./SubcategoriesEmptyState";
import { SubcategoriesHeader } from "./SubcategoriesHeader";
import { SubcategoriesPagination } from "./SubcategoriesPagination";
import { SubcategoriesSearch } from "./SubcategoriesSearch";
import { SubcategoriesTable } from "./SubcategoriesTable";
import { SubcategoryDeleteDialog } from "./SubcategoryDeleteDialog";
import { SubcategoryModal } from "./SubcategoryModal";

export const SubcategoriesGrid: React.FC = () => {
  const {
    categoryName,
    subcategories,
    subcategoriesPagination,
    isLoading,
    selectedSubcategory,
    isModalOpen,
    isDeleteDialogOpen,
    searchTerm,
    debouncedSearchTerm,
    formData,
    formError,
    isSubmitting,
    currentPage,
    pageSize,
    setSearchTerm,
    setFormData,
    handleOpenModal,
    handleCloseModal,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleSubmit,
    handleDelete,
    loadSubcategories,
  } = useSubcategoriesLogic();

  const hasNextPage = () => {
    if (!subcategoriesPagination) return false;
    return (currentPage + 1) * pageSize < subcategoriesPagination.total;
  };

  const hasPreviousPage = () => {
    return currentPage > 0;
  };

  const goToNextPage = () => {
    if (hasNextPage()) {
      loadSubcategories(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (hasPreviousPage()) {
      loadSubcategories(currentPage - 1);
    }
  };

  if (isLoading && !subcategories.length) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-row gap-2 text-lg text-grayscale-600">
          <Spinner />
          Cargando subcategorías...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <SubcategoriesHeader
          categoryName={categoryName}
          onAddSubcategory={() => handleOpenModal()}
        />

        <SubcategoriesSearch
          searchTerm={searchTerm}
          debouncedSearchTerm={debouncedSearchTerm}
          totalResults={subcategoriesPagination?.total}
          onSearchChange={setSearchTerm}
        />
      </div>

      {subcategories.length === 0 ? (
        <SubcategoriesEmptyState
          hasSearchTerm={!!searchTerm}
          onAddSubcategory={() => handleOpenModal()}
        />
      ) : (
        <>
          <SubcategoriesTable
            subcategories={subcategories}
            onEditSubcategory={handleOpenModal}
            onDeleteSubcategory={handleOpenDeleteDialog}
          />

          <SubcategoriesPagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={subcategoriesPagination?.total || 0}
            onPreviousPage={goToPreviousPage}
            onNextPage={goToNextPage}
            hasPreviousPage={hasPreviousPage()}
            hasNextPage={hasNextPage()}
          />
        </>
      )}

      <SubcategoryModal
        isOpen={isModalOpen}
        selectedSubcategory={selectedSubcategory}
        formData={formData}
        formError={formError}
        isSubmitting={isSubmitting}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        onFormChange={setFormData}
      />

      <SubcategoryDeleteDialog
        isOpen={isDeleteDialogOpen}
        selectedSubcategory={selectedSubcategory}
        onClose={handleCloseDeleteDialog}
        onConfirmDelete={handleDelete}
      />
    </div>
  );
};

export default SubcategoriesGrid;
