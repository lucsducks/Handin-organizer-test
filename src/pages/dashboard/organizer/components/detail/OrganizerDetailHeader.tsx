import React from "react";
import { OrganizerDetailDownloadButton } from "./OrganizerDetailDownloadButton";
import { OrganizerDetailObservationsDialog } from "./OrganizerDetailObservationsDialog";
import { OrganizerDetailVerificationButton } from "./OrganizerDetailVerificationButton";

interface OrganizerDetailHeaderProps {
  organizer: any;
  onVerification: () => void;
  onDownloadCV: () => void;
  formatDate: (date: string) => string;
}

export const OrganizerDetailHeader: React.FC<OrganizerDetailHeaderProps> = ({
  organizer,
  onVerification,
  onDownloadCV,
  formatDate,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-xl font-semibold text-grayscale-800 lg:text-3xl">
        Detalle de Organizador
      </h1>
      <div className="flex flex-col gap-2 sm:flex-row">
        <OrganizerDetailObservationsDialog
          organizer={organizer}
          formatDate={formatDate}
        />
        {organizer.cv && (
          <OrganizerDetailDownloadButton onDownloadCV={onDownloadCV} />
        )}
        <OrganizerDetailVerificationButton
          organizer={organizer}
          onVerification={onVerification}
        />
      </div>
    </div>
  );
};
