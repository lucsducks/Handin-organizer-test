import React from "react";
import { useOrganizerListLogic } from "../hooks/useOrganizerListLogic";
import { OrganizerListBreadcrumb } from "./OrganizerListBreadcrumb";
import { OrganizerListEmptyState } from "./OrganizerListEmptyState";
import { OrganizerListErrorState } from "./OrganizerListErrorState";
import { OrganizerListGrid } from "./OrganizerListGrid";
import { OrganizerListHeader } from "./OrganizerListHeader";
import { OrganizerListLoadingState } from "./OrganizerListLoadingState";

export const OrganizerList: React.FC = () => {
  const {
    organizers,
    filteredOrganizers,
    statistics,
    total,

    isLoading,
    error,
    searchTerm,

    setSearchTerm,
    handleNavigateToOrganizer,
    refetch,
  } = useOrganizerListLogic();

  if (isLoading && !organizers.length) {
    return <OrganizerListLoadingState />;
  }

  return (
    <div className="space-y-4">
      <OrganizerListBreadcrumb />

      <OrganizerListHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statistics={statistics}
        total={total}
        onRefresh={refetch}
      />

      {error && <OrganizerListErrorState error={error} onRetry={refetch} />}

      {filteredOrganizers.length === 0 ? (
        <OrganizerListEmptyState
          searchTerm={searchTerm}
          hasData={organizers.length > 0}
          onClearSearch={() => setSearchTerm("")}
        />
      ) : (
        <OrganizerListGrid
          organizers={filteredOrganizers}
          onNavigateToOrganizer={handleNavigateToOrganizer}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default React.memo(OrganizerList);