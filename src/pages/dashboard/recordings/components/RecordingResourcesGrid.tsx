import { useRecordingStore } from "@/store/recording.store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecordingCommentsLogic } from "../hooks/useRecordingCommentsLogic";
import { useRecordingResourcesLogic } from "../hooks/useRecordingResourcesGridLogic";
import { RecordingCommentsModal } from "./CommentModal";
import { ResourceCard } from "./ResourceCard";
import { RecordingResourcesGridBreadcrumb } from "./recording-resource-grid/RecordingResourcesGridBreadcrumb";
import { RecordingResourcesGridEmptyState } from "./recording-resource-grid/RecordingResourcesGridEmptyState";
import { RecordingResourcesGridHeader } from "./recording-resource-grid/RecordingResourcesGridHeader";
import { RecordingResourcesGridLoadingState } from "./recording-resource-grid/RecordingResourcesGridLoadingState";
import { RecordingResourcesGridModal } from "./recording-resource-grid/RecordingResourcesGridModal";
import { toast } from "react-toastify";

const RecordingResourcesGrid = () => {
  const { recordingId } = useParams<{ recordingId: string }>();
  const { selectedRecording, getOrganizerRecording, isLoading } =
    useRecordingStore();
  const navigate = useNavigate();

  const [isDeletingResource, setIsDeletingResource] = useState(false);
  const [_, setDeletingResourceId] = useState<number | null>(null);

  const {
    isResourceModalOpen,
    selectedResourceId,
    isSubmitting,
    formError,
    resourcePreview,
    resourceFormData,
    handleAddResource,
    handleCloseResourceModal,
    handleFileChange,
    handleResourceSubmit,
    handleRemoveResourcePreview,
    setResourceFormData,
    removeResource,
  } = useRecordingResourcesLogic(() => {
    getOrganizerRecording(Number(recordingId));
  });

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
    handleSearchChange,
    handleRatingChange,
    handleResetFilters,
    handleLoadMore,
  } = useRecordingCommentsLogic(Number(recordingId));

  useEffect(() => {
    getOrganizerRecording(Number(recordingId));
  }, [recordingId]);

  const handleAddNewResource = () => {
    if (isDeletingResource) return;
    handleAddResource();
  };

  const handleDeleteResource = async (resourceId: number) => {
    if (isDeletingResource) return;

    try {
      setIsDeletingResource(true);
      setDeletingResourceId(resourceId);

      await removeResource(resourceId, () => {
        getOrganizerRecording(Number(recordingId));
      });
    } catch (error) {
      toast.error("Error al eliminar recurso");
    } finally {
      setIsDeletingResource(false);
      setDeletingResourceId(null);
    }
  };

  const handleCloseModal = () => {
    if (isDeletingResource) return;
    handleCloseResourceModal();
  };

  if (isLoading && !selectedRecording) {
    return <RecordingResourcesGridLoadingState />;
  }

  return (
    <>
      <RecordingResourcesGridModal
        isOpen={isResourceModalOpen}
        selectedResourceId={selectedResourceId}
        resourceFormData={resourceFormData}
        formError={formError}
        isSubmitting={isSubmitting}
        resourcePreview={resourcePreview}
        onClose={handleCloseModal}
        onSubmit={handleResourceSubmit}
        onFormDataChange={setResourceFormData}
        onFileChange={handleFileChange}
        onRemovePreview={handleRemoveResourcePreview}
      />

      <RecordingCommentsModal
        isOpen={isCommentsModalOpen}
        onClose={closeCommentsModal}
        comments={comments}
        recordingTitle={selectedRecording?.recording.title}
        isLoading={isLoading}
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

      <RecordingResourcesGridBreadcrumb />

      <RecordingResourcesGridHeader
        onNavigateToStudentView={() => {
          if (isDeletingResource) return;
          navigate(`/dashboard/recordings-organizer/${recordingId}/content`);
        }}
        onAddResource={handleAddNewResource}
        onViewComments={openCommentsModal}
      />

      {isDeletingResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex items-center gap-3 rounded-lg bg-white p-6">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <span>Eliminando recurso...</span>
          </div>
        </div>
      )}

      {selectedRecording?.recording.resources.length === 0 ? (
        <RecordingResourcesGridEmptyState
          onAddResource={handleAddNewResource}
        />
      ) : (
        <article className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {selectedRecording?.recording.resources.map((resource, index) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              index={index}
              onDeleteResource={handleDeleteResource}
            />
          ))}
        </article>
      )}
    </>
  );
};

export default RecordingResourcesGrid;
