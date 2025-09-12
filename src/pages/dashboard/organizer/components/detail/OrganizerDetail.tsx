import React from "react";
import { useOrganizerDetailLogic } from "../../hooks/useOrganizerDetailLogic";
import { OrganizerDetailBreadcrumb } from "./OrganizerDetailBreadcrumb";
import { OrganizerDetailErrorState } from "./OrganizerDetailErrorState";
import { OrganizerDetailHeader } from "./OrganizerDetailHeader";
import { OrganizerDetailLoadingState } from "./OrganizerDetailLoadingState";
import { OrganizerDetailNotFoundState } from "./OrganizerDetailNotFoundState";
import OrganizerProfile from "@/components/organizer-profile/components/OrganizerProfile";

export const OrganizerDetail: React.FC = () => {
  const {
    organizer,
    isLoading,
    error,
    handleVerification,
    handleDownloadCV,
    formatDate,
  } = useOrganizerDetailLogic();

  if (isLoading) {
    return <OrganizerDetailLoadingState />;
  }

  if (error) {
    return <OrganizerDetailErrorState error={error} />;
  }

  if (!organizer) {
    return <OrganizerDetailNotFoundState />;
  }

  const organizerName =
    `${organizer.user?.firstName || ""} ${organizer.user?.lastName || ""}`.trim();

  return (
    <div className="space-y-4 p-4 lg:p-8">
      <div className="flex flex-col gap-4">
        <OrganizerDetailBreadcrumb organizerName={organizerName} />
        <OrganizerDetailHeader
          organizer={organizer}
          onVerification={handleVerification}
          onDownloadCV={handleDownloadCV}
          formatDate={formatDate}
        />
      </div>
      <OrganizerProfile organizer={organizer} />
    </div>
  );
};

export default OrganizerDetail;
