import React from "react";
import { useRecordingsAdminLogic } from "../hooks/useRecordingsAdminLogic";
import { RecordingsAdminBreadcrumb } from "./RecordingsAdminBreadcrumb";
import { RecordingsAdminEmptyState } from "./RecordingsAdminEmptyState";
import { RecordingsAdminFilterBanner } from "./RecordingsAdminFilterBanner";
import { RecordingsAdminFilters } from "./RecordingsAdminFilters";
import { RecordingsAdminHeader } from "./RecordingsAdminHeader";
import { RecordingsAdminLoadingState } from "./RecordingsAdminLoadingState";
import { RecordingsAdminPagination } from "./RecordingsAdminPagination";
import { RecordingsAdminTable } from "./RecordingsAdminTable";

export const RecordingsAdminGrid: React.FC = () => {
  const {
    recordings,
    total,
    isLoading,
    searchTerm,
    searchInputRef,
    showUnverifiedOnly,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    getPaginationInfo,
    setSearchTerm,
    handleUnverifiedToggle,
    handleClearSearch,
    navigateToRecordingContent,
    setShowUnverifiedOnly,
  } = useRecordingsAdminLogic();

  if (isLoading && !recordings.length) {
    return <RecordingsAdminLoadingState />;
  }

  return (
    <>
      <RecordingsAdminBreadcrumb />

      <div className="flex flex-col gap-4 md:flex-row">
        <RecordingsAdminHeader />

        <RecordingsAdminFilters
          searchTerm={searchTerm}
          showUnverifiedOnly={showUnverifiedOnly}
          total={total}
          searchInputRef={searchInputRef}
          onSearchChange={setSearchTerm}
          onUnverifiedToggle={handleUnverifiedToggle}
          onClearSearch={handleClearSearch}
        />
      </div>
      <RecordingsAdminFilterBanner
        showUnverifiedOnly={showUnverifiedOnly}
        onRemoveFilter={() => setShowUnverifiedOnly(false)}
      />
      {recordings.length === 0 ? (
        <RecordingsAdminEmptyState
          showUnverifiedOnly={showUnverifiedOnly}
          searchTerm={searchTerm}
          onViewAllRecordings={() => setShowUnverifiedOnly(false)}
        />
      ) : (
        <>
          <RecordingsAdminTable
            recordings={recordings}
            onNavigateToContent={navigateToRecordingContent}
          />

          <RecordingsAdminPagination
            getPaginationInfo={getPaginationInfo}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
          />
        </>
      )}
    </>
  );
};

export default RecordingsAdminGrid;
