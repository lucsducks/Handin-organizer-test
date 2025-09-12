import { useRecordingsOrganizerGridLogic } from "../hooks/useRecordingsOrganizerGridLogic";
import { RecordingsOrganizerGridBreadcrumb } from "./recording-organizer-grid/RecordingsOrganizerGridBreadcrumb";
import { RecordingsOrganizerGridEmptyState } from "./recording-organizer-grid/RecordingsOrganizerGridEmptyState";
import { RecordingsOrganizerGridErrorState } from "./recording-organizer-grid/RecordingsOrganizerGridErrorState";
import { RecordingsOrganizerGridHeader } from "./recording-organizer-grid/RecordingsOrganizerGridHeader";
import { RecordingsOrganizerGridLoadingState } from "./recording-organizer-grid/RecordingsOrganizerGridLoadingState";
import { RecordingsOrganizerGridModal } from "./recording-organizer-grid/RecordingsOrganizerGridModal";
import { RecordingsOrganizerGridPagination } from "./recording-organizer-grid/RecordingsOrganizerGridPagination";
import { RecordingsOrganizerGridTable } from "./recording-organizer-grid/RecordingsOrganizerGridTable";

export const RecordingsOrganizerGrid = () => {
  const {
    recordings,
    error,
    total,
    isLoading,
    selectedRecording,
    isModalOpen,
    searchTerm,
    formData,
    formError,
    isSubmitting,
    imagePreview,
    searchInputRef,

    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    getPaginationInfo,

    setSearchTerm,
    setFormData,
    handleOpenModal,
    handleCloseModal,
    handleFileChange,
    handleSubmit,
    handleNavigateToContent,
    handleClearSearch,
    handleRemoveImage,
  } = useRecordingsOrganizerGridLogic();

  if (error) {
    return <RecordingsOrganizerGridErrorState error={error} />;
  }

  return (
    <>
      <RecordingsOrganizerGridBreadcrumb />

      <RecordingsOrganizerGridHeader
        searchTerm={searchTerm}
        searchInputRef={searchInputRef}
        total={total}
        onSearchChange={setSearchTerm}
        onClearSearch={handleClearSearch}
        onNewRecording={() => handleOpenModal()}
      />

      {isLoading && !recordings.length ? (
        <RecordingsOrganizerGridLoadingState />
      ) : recordings.length === 0 ? (
        <RecordingsOrganizerGridEmptyState
          searchTerm={searchTerm}
          onNewRecording={() => handleOpenModal()}
        />
      ) : (
        <>
          <RecordingsOrganizerGridTable
            recordings={recordings}
            onEdit={handleOpenModal}
            onNavigateToContent={handleNavigateToContent}
          />

          <RecordingsOrganizerGridPagination
            getPaginationInfo={getPaginationInfo}
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
          />
        </>
      )}

      <RecordingsOrganizerGridModal
        isOpen={isModalOpen}
        selectedRecording={selectedRecording}
        formData={formData}
        formError={formError}
        isSubmitting={isSubmitting}
        imagePreview={imagePreview}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        onFormDataChange={(data) => setFormData({ ...formData, ...data })}
        onFileChange={handleFileChange}
        onRemoveImage={handleRemoveImage}
      />
    </>
  );
};

export default RecordingsOrganizerGrid;
