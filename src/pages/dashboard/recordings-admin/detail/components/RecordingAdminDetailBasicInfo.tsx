import { renderRecordingStatus } from "@/utils/render-status";
import { renderVerificationStatus } from "@/utils/render-verification";
import React from "react";

interface RecordingAdminDetailBasicInfoProps {
  recording: any;
}

export const RecordingAdminDetailBasicInfo: React.FC<
  RecordingAdminDetailBasicInfoProps
> = ({ recording }) => {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-semibold text-grayscale-800 md:text-3xl">
          {recording.title}
        </h2>
        {renderVerificationStatus(recording.verificationStatus)}
        {renderRecordingStatus(recording.status)}
      </div>
      <p className="mt-4 text-grayscale-600">{recording.description}</p>
    </div>
  );
};
