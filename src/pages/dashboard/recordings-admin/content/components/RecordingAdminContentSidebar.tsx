import { Recording, Resource } from "@/models/recording/recording.model";
import React from "react";
import { RecordingAdminContentHeader } from "./RecordingAdminContentHeader";
import { RecordingAdminResourcesList } from "./RecordingAdminContentResourcesList";

interface RecordingAdminContentSidebarProps {
  recording: Recording;
  handleResourceClick: (resource: Resource) => void;
  handleDownload: (resource: Resource) => void;
  isPlayableVideo: (resource: Resource) => boolean;
  isDownloadable: (resource: Resource) => boolean;
}

export const RecordingAdminContentSidebar: React.FC<
  RecordingAdminContentSidebarProps
> = ({
  recording,
  handleResourceClick,
  handleDownload,
  isPlayableVideo,
  isDownloadable,
}) => {
  return (
    <section className="flex flex-col gap-4">
      <RecordingAdminContentHeader recording={recording} />
      <RecordingAdminResourcesList
        handleResourceClick={handleResourceClick}
        handleDownload={handleDownload}
        isPlayableVideo={isPlayableVideo}
        isDownloadable={isDownloadable}
        resources={recording.resources || []}
      />
    </section>
  );
};
