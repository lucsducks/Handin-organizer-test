import { useConferenceOrganizerLogic } from "../hooks/useConferenceOrganizerLogic";
import { ConferenceEnrollmentsModal } from "./ConferenceEnrollmentsModal";
import { ConferenceFormModal } from "./ConferenceFormModal";
import { ConferenceOrganizerBreadcrumb } from "./ConferenceOrganizerBreadcrumb";
import { ConferenceOrganizerEmptyState } from "./ConferenceOrganizerEmptyState";
import { ConferenceOrganizerFilters } from "./ConferenceOrganizerFilters";
import { ConferenceOrganizerHeader } from "./ConferenceOrganizerHeader";
import { ConferenceOrganizerPagination } from "./ConferenceOrganizerPagination";
import { ConferenceOrganizerTable } from "./ConferenceOrganizerTable";


const ConferenceOrganizerGrid = () => {
  const {
    conferences,
    total,
    selectedConference,
    selectedConferenceEnrollments,
    isModalOpen,
    isModalEnrollmentsOpen,
    isJoining,
    isChangeState,
    isSubmitting,
    searchTerm,
    formData,
    formError,
    imagePreview,
    searchInputRef,

    setSearchTerm,
    setFormData,
    setFormError,
    setImagePreview,
    handleFileChange,
    handleSubmit,

    setIsModalEnrollmentsOpen,
    handleOpenModal,
    handleOpenEnrollmentsModal,
    handleCloseModal,

    handleJoin,
    handleStartConference,
    handleFinishConference,

    addSeat,
    removeSeat,
    updateSeat,
    setCategoryId,

    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    getPaginationInfo,
  } = useConferenceOrganizerLogic();

  const handleCreateConference = () => {
    handleOpenModal();
  };

  const handleEditConference = (conference: any) => {
    handleOpenModal(conference);
  };

  return (
    <>
      <ConferenceOrganizerBreadcrumb />

      <ConferenceOrganizerHeader onCreateConference={handleCreateConference} />

      <ConferenceOrganizerFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchInputRef={searchInputRef}
        total={total}
      />

      {conferences.length === 0 ? (
        <ConferenceOrganizerEmptyState
          searchTerm={searchTerm}
          onCreateConference={handleCreateConference}
        />
      ) : (
        <>
          <ConferenceOrganizerTable
            conferences={conferences}
            onOpenEnrollmentsModal={handleOpenEnrollmentsModal}
            onJoin={handleJoin}
            onEdit={handleEditConference}
            onStart={handleStartConference}
            onFinish={handleFinishConference}
            isJoining={isJoining}
            isChangeState={isChangeState}
          />

          <ConferenceOrganizerPagination
            getPaginationInfo={getPaginationInfo}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
          />
        </>
      )}

      <ConferenceFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedConference={selectedConference}
        formData={formData}
        setFormData={setFormData}
        formError={formError}
        setFormError={setFormError}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onFileChange={handleFileChange}
        addSeat={addSeat}
        removeSeat={removeSeat}
        updateSeat={updateSeat}
        setCategoryId={setCategoryId}
      />

      <ConferenceEnrollmentsModal
        isOpen={isModalEnrollmentsOpen}
        onClose={() => setIsModalEnrollmentsOpen(false)}
        selectedConference={selectedConference}
        selectedConferenceEnrollments={selectedConferenceEnrollments}
      />
    </>
  );
};

export default ConferenceOrganizerGrid;
