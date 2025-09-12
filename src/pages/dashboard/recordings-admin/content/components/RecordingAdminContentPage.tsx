import React from "react";
import { useRecordingAdminContentLogic } from "../hooks/useRecordingAdminContentLogic";
import { RecordingAdminContentEmptyState } from "./RecordingAdminContentEmptyState";
import { RecordingAdminContentLoadingState } from "./RecordingAdminContentLoadingState";
import { RecordingAdminContentMainSection } from "./RecordingAdminContentMainSection";
import { RecordingAdminContentSidebar } from "./RecordingAdminContentSidebar";

const RecordingAdminContentPage: React.FC = () => {
  const {
    selectedRecording,
    videoResource,
    handleResourceClick,
    handleDownload,
    isPlayableVideo,
    isDownloadable,
  } = useRecordingAdminContentLogic();

  if (!selectedRecording) {
    return <RecordingAdminContentLoadingState />;
  }

  if (!selectedRecording.recording) {
    return <RecordingAdminContentEmptyState />;
  }

  const { recording } = selectedRecording;

  return (
    <article className="flex flex-col-reverse gap-4 p-4 2xl:grid 2xl:grid-cols-3">
      <RecordingAdminContentMainSection videoResource={videoResource} />
      <RecordingAdminContentSidebar
        handleResourceClick={handleResourceClick}
        handleDownload={handleDownload}
        isPlayableVideo={isPlayableVideo}
        isDownloadable={isDownloadable}
        recording={recording}
      />
    </article>
  );
};

export default RecordingAdminContentPage;
