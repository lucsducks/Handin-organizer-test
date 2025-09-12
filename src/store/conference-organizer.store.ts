import {
  createConference,
  deleteConference,
  getConferencesByHost,
  getConferencesByStatus,
  joinConference,
  updateConference,
  updateConferenceStatus,
} from "@/api/conference.api";
import { ConferenceStatus } from "@/enums/conference-status.enum";
import { ConferenceDetail } from "@/models/conferences/conference.model";
import {
  CreateConferenceForm,
  GetConferencesQuery,
  UpdateConferenceForm,
} from "@/types/conference/conference.type";
import { create } from "zustand";

interface ConferenceState {
  conferences: ConferenceDetail[];
  total: number;
  selectedConference: ConferenceDetail | null;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  videoToken: string | null;

  fetchConferences: (query: GetConferencesQuery) => Promise<void>;
  fetchConferencesByStatus: (status: string) => Promise<void>;
  getConferenceById: (id: number) => ConferenceDetail | null;
  createConference: (formData: CreateConferenceForm) => Promise<void>;
  updateConference: (
    id: number,
    formData: UpdateConferenceForm,
  ) => Promise<void>;
  removeConference: (id: number) => Promise<void>;
  updateConferenceStatus: (id: string, status: ConferenceStatus) => Promise<void>;
  joinConference: (id: string) => Promise<string>;
  setSelectedConference: (conference: ConferenceDetail | null) => void;
  setConferences: (conferences: ConferenceDetail[]) => void;
  setVideoToken: (token: string | null) => void;
  clearConferences: () => void;
}

export const useConferenceOrganizerStore = create<ConferenceState>((set, get) => ({
  conferences: [],
  total: 0,
  selectedConference: null,
  isLoading: false,
  error: null,
  initialized: false,
  videoToken: null,

  fetchConferences: async (query: GetConferencesQuery) => {
    if (get().isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const response = await getConferencesByHost(query);
      set({
        conferences: response.data.conferences,
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

  fetchConferencesByStatus: async (status: string) => {
    if (get().isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const response = await getConferencesByStatus(status);
      set({
        conferences: response.data.conferences,
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

  createConference: async (formData: CreateConferenceForm) => {
    set({ isLoading: true, error: null });
    try {
      const response = await createConference(formData);

      const newConferenceDetail: ConferenceDetail = {
        conference: response.data,
        attendees: {
          inPersonAttendees: 0,
          virtualAttendees: 0,
        },
      };

      set({
        conferences: [...get().conferences, newConferenceDetail],
        total: get().total + 1,
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
  getConferenceById: (id: number) => {
    const conferences = get().conferences;
    return conferences.find((conf) => conf.conference.id === id) || null;
  },

  updateConference: async (id: number, formData: UpdateConferenceForm) => {
    set({ isLoading: true, error: null });
    try {
      const response = await updateConference(id, formData);

      const updatedConferences = get().conferences.map((conferenceDetail) =>
        conferenceDetail.conference.id === id
          ? { ...conferenceDetail, conference: response.data }
          : conferenceDetail
      );

      set({
        conferences: updatedConferences,
        isLoading: false,
        error: null,
      });

      const selectedConference = get().selectedConference;
      if (selectedConference && selectedConference.conference.id === id) {
        set({
          selectedConference: {
            ...selectedConference,
            conference: response.data,
          },
        });
      }
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

  removeConference: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await deleteConference(id);

      const updatedConferences = get().conferences.filter(
        (conferenceDetail) => conferenceDetail.conference.id !== id
      );

      set({
        conferences: updatedConferences,
        total: get().total - 1,
        isLoading: false,
        error: null,
      });

      const selectedConference = get().selectedConference;
      if (selectedConference && selectedConference.conference.id === id) {
        set({ selectedConference: null });
      }
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

  updateConferenceStatus: async (id: string, status: ConferenceStatus) => {
    try {
      await updateConferenceStatus(id, status);

      const updatedConferences = get().conferences.map((conferenceDetail) =>
        conferenceDetail.conference.id.toString() === id
          ? {
            ...conferenceDetail,
            conference: {
              ...conferenceDetail.conference,
              status: status,
            },
          }
          : conferenceDetail
      );

      set({ conferences: updatedConferences });

      const selectedConference = get().selectedConference;
      if (selectedConference && selectedConference.conference.id.toString() === id) {
        set({
          selectedConference: {
            ...selectedConference,
            conference: {
              ...selectedConference.conference,
              status: status,
            },
          },
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al actualizar estado";
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  joinConference: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const info: any = await joinConference(id);
      set({
        videoToken: info.data,
        isLoading: false,
        error: null,
      });
      return info.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al unirse a la conferencia";
      set({
        error: errorMessage,
        isLoading: false,
        videoToken: null,
      });
      throw new Error(errorMessage);
    }
  },

  setSelectedConference: (conference) =>
    set({ selectedConference: conference }),

  setConferences: (conferences) =>
    set({
      conferences,
      total: conferences.length,
    }),

  setVideoToken: (token) => set({ videoToken: token }),

  clearConferences: () =>
    set({
      conferences: [],
      total: 0,
      selectedConference: null,
      videoToken: null,
      error: null,
      initialized: false,
    }),
}));

export const useConferenceState = () =>
  useConferenceOrganizerStore((state) => ({
    conferences: state.conferences,
    total: state.total,
    selectedConference: state.selectedConference,
    isLoading: state.isLoading,
    error: state.error,
    initialized: state.initialized,
    videoToken: state.videoToken,
  }));

export const useConferenceActions = () =>
  useConferenceOrganizerStore((state) => ({
    fetchConferences: state.fetchConferences,
    fetchConferencesByStatus: state.fetchConferencesByStatus,
    createConference: state.createConference,
    updateConference: state.updateConference,
    removeConference: state.removeConference,
    updateConferenceStatus: state.updateConferenceStatus,
    joinConference: state.joinConference,
    setSelectedConference: state.setSelectedConference,
    setConferences: state.setConferences,
    setVideoToken: state.setVideoToken,
    clearConferences: state.clearConferences,
  }));

export const useConferenceById = (id: number) =>
  useConferenceOrganizerStore((state) =>
    state.conferences.find((conf) => conf.conference.id === id)
  );

export const useConferencesByStatus = (status: ConferenceStatus) =>
  useConferenceOrganizerStore((state) =>
    state.conferences.filter((conf) => conf.conference.status === status)
  );

export const useConferenceStats = () =>
  useConferenceOrganizerStore((state) => {
    const conferences = state.conferences;
    return {
      total: conferences.length,
      scheduled: conferences.filter(c => c.conference.status === ConferenceStatus.SCHEDULED).length,
      inProgress: conferences.filter(c => c.conference.status === ConferenceStatus.ON_GOING).length,
      cancelled: conferences.filter(c => c.conference.status === ConferenceStatus.CANCELED).length,
      finished: conferences.filter(c => c.conference.status === ConferenceStatus.FINISHED).length,
    };
  });