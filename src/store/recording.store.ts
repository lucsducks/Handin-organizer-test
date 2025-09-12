import {
  approveRecording,
  createRecording,
  deleteRecording,
  getAdminRecording,
  getOrganizerRecording,
  getRecordingsAdmin,
  getRecordingsByOrganizer,
  rejectRecording,
  updateRecording,
} from "@/api/recording.api";
import { RecordingDetail } from "@/models/recording/recording.model";
import {
  CreateRecordingOrganizerForm,
  GetRecordingsQuery,
  UpdateRecordingOrganizerForm,
} from "@/types/recording/recording.type";
import { toast } from "react-toastify";
import { create } from "zustand";

interface RecordingState {
  recordings: RecordingDetail[];
  total: number;
  selectedRecording: RecordingDetail | null;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;

  fetchRecordings: (query: GetRecordingsQuery) => Promise<void>;
  fetchRecordingsAdmin: (query: GetRecordingsQuery) => Promise<void>;

  createRecording: (formData: CreateRecordingOrganizerForm) => Promise<void>;
  updateRecording: (
    id: number,
    formData: UpdateRecordingOrganizerForm,
  ) => Promise<void>;
  approveRecording: (id: number) => Promise<void>;
  rejectRecording: (id: number, reason: string) => Promise<void>;
  getOrganizerRecording: (id: number) => Promise<void>;
  getAdminRecording: (id: number) => Promise<void>;
  removeRecording: (id: number) => Promise<void>;

  setSelectedRecording: (recording: RecordingDetail | null) => void;
  setRecordings: (recordings: RecordingDetail[]) => void;
  clearRecordings: () => void;
}

export const useRecordingStore = create<RecordingState>((set, get) => ({
  recordings: [],
  total: 0,
  selectedRecording: null,
  isLoading: false,
  error: null,
  initialized: false,

  fetchRecordings: async (query: GetRecordingsQuery) => {
    if (get().isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const response = await getRecordingsByOrganizer(query);

      set({
        recordings: response.data.recordings,
        total: response.data.total,
        isLoading: false,
        initialized: true,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        isLoading: false,
        initialized: true,
      });
    }
  },

  fetchRecordingsAdmin: async (query: GetRecordingsQuery) => {
    if (get().isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const response = await getRecordingsAdmin(query);

      set({
        recordings: response.data.recordings,
        total: response.data.total,
        isLoading: false,
        initialized: true,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        isLoading: false,
        initialized: true,
      });
    }
  },

  getOrganizerRecording: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getOrganizerRecording(id);
      set({
        selectedRecording: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      set({
        error: errorMessage,
        isLoading: false,
        initialized: true,
      });
      throw new Error(errorMessage);
    }
  },

  getAdminRecording: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getAdminRecording(id);

      set({
        selectedRecording: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      set({
        error: errorMessage,
        isLoading: false,
        initialized: true,
      });
      throw new Error(errorMessage);
    }
  },

  createRecording: async (formData: CreateRecordingOrganizerForm) => {
    set({ isLoading: true, error: null });
    try {
      const response = await createRecording(formData);
      const updatedRecordings = [...get().recordings, response.data];
      set({
        recordings: updatedRecordings,
        total: get().total + 1,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      toast.error("Error al crear grabación");
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw new Error(errorMessage);
    }
  },

  approveRecording: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await approveRecording(id);
      const updatedRecordings = get().recordings.map((recordingDetail) =>
        recordingDetail.recording.id === id
          ? {
              ...recordingDetail,
              recording: {
                ...recordingDetail.recording,
                verificationStatus: "Verificado" as any,
              },
            }
          : recordingDetail,
      );
      set({
        recordings: updatedRecordings,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw new Error(errorMessage);
    }
  },

  rejectRecording: async (id: number, reason: string) => {
    set({ isLoading: true, error: null });
    try {
      await rejectRecording(id, reason);
      const updatedRecordings = get().recordings.map((recordingDetail) =>
        recordingDetail.recording.id === id
          ? {
              ...recordingDetail,
              recording: {
                ...recordingDetail.recording,
                verificationStatus: "Rechazado" as any,
              },
            }
          : recordingDetail,
      );
      set({
        recordings: updatedRecordings,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw new Error(errorMessage);
    }
  },

  updateRecording: async (
    id: number,
    formData: UpdateRecordingOrganizerForm,
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await updateRecording(formData);
      const updatedRecordings = get().recordings.map((recordingDetail) =>
        recordingDetail.recording.id === id ? response.data : recordingDetail,
      );
      set({
        recordings: updatedRecordings,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw new Error(errorMessage);
    }
  },

  removeRecording: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await deleteRecording(id);
      const updatedRecordings = get().recordings.filter(
        (recordingDetail) => recordingDetail.recording.id !== id,
      );
      set({
        recordings: updatedRecordings,
        total: get().total - 1,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw new Error(errorMessage);
    }
  },

  setSelectedRecording: (recording) => set({ selectedRecording: recording }),
  setRecordings: (recordings) => set({ recordings }),
  clearRecordings: () =>
    set({
      recordings: [],
      total: 0,
      selectedRecording: null,
      error: null,
      initialized: false,
    }),
}));

export const useRecordingState = () =>
  useRecordingStore((state) => ({
    recordings: state.recordings,
    total: state.total,
    selectedRecording: state.selectedRecording,
    isLoading: state.isLoading,
    error: state.error,
    initialized: state.initialized,
  }));

export const useRecordingActions = () =>
  useRecordingStore((state) => ({
    fetchRecordings: state.fetchRecordings,
    fetchRecordingsAdmin: state.fetchRecordingsAdmin,
    createRecording: state.createRecording,
    updateRecording: state.updateRecording,
    removeRecording: state.removeRecording,
    getOrganizerRecording: state.getOrganizerRecording,
    getAdminRecording: state.getAdminRecording,
    approveRecording: state.approveRecording,
    rejectRecording: state.rejectRecording,
    setSelectedRecording: state.setSelectedRecording,
    setRecordings: state.setRecordings,
    clearRecordings: state.clearRecordings,
  }));
