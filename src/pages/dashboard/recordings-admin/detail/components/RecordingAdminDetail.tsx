import { Card } from "@/components/ui/card";
import { RecordingCommentsModal } from "@/pages/dashboard/recordings/components/CommentModal";
import { useRecordingCommentsLogic } from "@/pages/dashboard/recordings/hooks/useRecordingCommentsLogic";
import React from "react";
import { useParams } from "react-router-dom";
import { useRecordingAdminDetailLogic } from "../hooks/useRecordingAdminDetailLogic";
import { RecordingAdminDetailBreadcrumb } from "./RecordingAdminDetailBreadcrumb";
import { RecordingAdminDetailErrorState } from "./RecordingAdminDetailErrorState";
import { RecordingAdminDetailHeader } from "./RecordingAdminDetailHeader";
import { RecordingAdminDetailLoadingState } from "./RecordingAdminDetailLoadingState";
import { RecordingAdminDetailMainContent } from "./RecordingAdminDetailMainContent";
import { RecordingAdminDetailNotFoundState } from "./RecordingAdminDetailNotFoundState";
import { RecordingAdminDetailRejectDialog } from "./RecordingAdminDetailRejectDialog";
import { RecordingAdminDetailSidebar } from "./RecordingAdminDetailSidebar";
import { RecordingAdminDetailVerificationButton } from "./RecordingAdminDetailVerificationButton";

export const RecordingAdminDetail: React.FC = () => {
  const { recordingId } = useParams<{ recordingId: string }>();
  const {
    selectedRecording,
    isLoading,
    error,
    processingAction,
    isRejectDialogOpen,
    rejectReason,
    rejectReasonError,
    setRejectReason,
    setRejectReasonError,
    handleApproveRecording,
    handleOpenRejectDialog,
    handleCloseRejectDialog,
    handleRejectRecording,
    navigateToStudentView,
  } = useRecordingAdminDetailLogic();

  const {
    isCommentsModalOpen,
    openCommentsModal,
    closeCommentsModal,
    comments,
    totalComments,
    hasMore,
    searchTerm,
    selectedRating,
    averageRating,
    isLoading: commentsLoading,
    handleSearchChange,
    handleRatingChange,
    handleResetFilters,
    handleLoadMore,
  } = useRecordingCommentsLogic(Number(recordingId));
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleRejectReasonChange = (value: string) => {
    setRejectReason(value);
    if (value.trim()) {
      setRejectReasonError("");
    }
  };

  const renderVerificationButton = () => (
    <RecordingAdminDetailVerificationButton
      verificationStatus={
        selectedRecording?.recording?.verificationStatus || ""
      }
      processingAction={processingAction}
      onApprove={handleApproveRecording}
      onReject={handleOpenRejectDialog}
    />
  );

  if (isLoading) {
    return <RecordingAdminDetailLoadingState />;
  }

  if (error) {
    return <RecordingAdminDetailErrorState error={error} />;
  }

  if (!selectedRecording || !selectedRecording.recording) {
    return <RecordingAdminDetailNotFoundState />;
  }

  const { recording, students } = selectedRecording;

  return (
    <>
      <RecordingCommentsModal
        isOpen={isCommentsModalOpen}
        onClose={closeCommentsModal}
        comments={comments}
        recordingTitle={selectedRecording?.recording.title}
        isLoading={commentsLoading}
        totalComments={totalComments}
        hasMore={hasMore}
        searchTerm={searchTerm}
        selectedRating={selectedRating}
        averageRating={averageRating}
        onSearchChange={handleSearchChange}
        onRatingChange={handleRatingChange}
        onResetFilters={handleResetFilters}
        onLoadMore={handleLoadMore}
      />
      <div className="space-y-4">
        <div className="space-y-4">
          <RecordingAdminDetailBreadcrumb recordingTitle={recording.title} />
          <RecordingAdminDetailHeader
            onNavigateToStudentView={navigateToStudentView}
            renderVerificationButton={renderVerificationButton}
            onViewComments={openCommentsModal}
          />
        </div>

        <Card className="flex flex-col gap-4 overflow-hidden">
          <div className="flex flex-col gap-4 xl:grid xl:grid-cols-3">
            <RecordingAdminDetailMainContent
              recording={recording}
              students={students}
              formatDate={formatDate}
            />
            <RecordingAdminDetailSidebar recording={recording} />
          </div>
          <div className="col-span-4 flex flex-col items-center justify-between border-t pt-4 text-sm text-grayscale-600 sm:flex-row">
            <div>
              Creado:{" "}
              {recording.createdAt
                ? formatDate(recording.createdAt)
                : "No disponible"}
            </div>
            <div>Última actualización: {formatDate(recording.updatedAt)}</div>
          </div>
        </Card>

        <RecordingAdminDetailRejectDialog
          isOpen={isRejectDialogOpen}
          onClose={handleCloseRejectDialog}
          rejectReason={rejectReason}
          rejectReasonError={rejectReasonError}
          processingAction={processingAction}
          onRejectReasonChange={handleRejectReasonChange}
          onConfirmReject={handleRejectRecording}
        />
      </div>
    </>
  );
};

export default RecordingAdminDetail;
