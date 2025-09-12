import { useRecordingStore } from "@/store/recording.store";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useRecordingAdminDetailLogic = () => {
  const { recordingId } = useParams<{ recordingId: string }>();
  const navigate = useNavigate();
  const [processingAction, setProcessingAction] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectReasonError, setRejectReasonError] = useState("");

  const {
    selectedRecording,
    isLoading,
    error,
    getAdminRecording,
    setSelectedRecording,
    approveRecording,
    rejectRecording,
  } = useRecordingStore();

  const fetchRecording = useCallback(() => {
    if (recordingId) {
      getAdminRecording(parseInt(recordingId));
    }
  }, [recordingId, getAdminRecording]);

  useEffect(() => {
    fetchRecording();

    return () => {
      setSelectedRecording(null);
    };
  }, [fetchRecording, setSelectedRecording]);

  const handleApproveRecording = async () => {
    if (!recordingId) return;

    try {
      setProcessingAction(true);
      await approveRecording(parseInt(recordingId));
      toast.success("Grabación aprobada correctamente");
      fetchRecording();
    } catch (error) {
      toast.error("Error al aprobar la grabación");
    } finally {
      setProcessingAction(false);
    }
  };

  const handleOpenRejectDialog = () => {
    setRejectReason("");
    setRejectReasonError("");
    setIsRejectDialogOpen(true);
  };

  const handleCloseRejectDialog = () => {
    setIsRejectDialogOpen(false);
  };

  const handleRejectRecording = async () => {
    if (!recordingId) return;

    if (!rejectReason.trim()) {
      setRejectReasonError(
        "Debes ingresar una razón para rechazar la grabación",
      );
      return;
    }

    try {
      setProcessingAction(true);
      await rejectRecording(parseInt(recordingId), rejectReason);
      toast.success("Grabación rechazada correctamente");
      handleCloseRejectDialog();
      fetchRecording();
    } catch (error) {
      toast.error("Error al rechazar la grabación");
    } finally {
      setProcessingAction(false);
    }
  };

  const navigateToStudentView = () => {
    navigate(`/dashboard/recordings-admin/${recordingId}/content`);
  };

  return {
    recordingId,
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
  };
};
