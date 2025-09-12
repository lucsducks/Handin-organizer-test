import {
  createOrganizer,
  deleteOrganizer,
  getProfileOrganizer,
  getOrganizer,
  getOrganizers,
  statusverifyOrganizer,
  updateOrganizer,
} from "@/api/organizer.api";
import { useAuthStore } from "@/context/auth.context";
import { Organizer } from "@/models/organizer/organizer.model";
import {
  NewOrganizerForm,
  UpdateOrganizerForm,
} from "@/types/organizer/organizer.type";

import { create } from "zustand";

interface OrganizerState {
  organizer: Organizer | null;
  organizers: Organizer[];
  total: number;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;

  fetchOrganizerProfile: () => Promise<void>;
  fetchOrganizers: () => Promise<void>;
  fetchOrganizer: (id: number) => Promise<void>;

  createOrganizerProfile: (formData: NewOrganizerForm) => Promise<void>;
  updateOrganizerProfile: (formData: UpdateOrganizerForm) => Promise<void>;
  deleteOrganizerProfile: (id: number) => Promise<void>;
  StatusOrganizer: (id: number) => Promise<void>;
  setOrganizer: (organizer: Organizer | null) => void;
  clearOrganizer: () => void;
}

export const useOrganizerStore = create<OrganizerState>((set, get) => ({
  organizer: null,
  organizers: [],
  total: 0,
  isLoading: false,
  error: null,
  initialized: false,

  fetchOrganizerProfile: async () => {
    if (get().isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const organizer = await getProfileOrganizer();
      set({
        organizer,
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

  fetchOrganizers: async () => {
    if (get().isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const response = await getOrganizers();
      set({
        organizers: response.organizers,
        total: response.total,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        isLoading: false,
      });
    }
  },

  fetchOrganizer: async (id: number) => {
    if (get().isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const organizer = await getOrganizer(id);
      set({
        organizer,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        isLoading: false,
      });
    }
  },

  createOrganizerProfile: async (formData: NewOrganizerForm) => {
    set({ isLoading: true, error: null });
    try {
      const organizer = await createOrganizer(formData);
      set({
        organizer,
        isLoading: false,
        error: null,
      });
      useAuthStore.getState().addOrganizerRole(organizer.id);
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

  updateOrganizerProfile: async (formData: UpdateOrganizerForm) => {
    const state = get();
    if (!state.organizer?.id) throw new Error("ID de profesor no encontrado");

    set({ isLoading: true, error: null });
    try {
      const payload: UpdateOrganizerForm = {};

      if (formData.degree !== undefined) payload.degree = formData.degree;
      if (formData.specialty !== undefined)
        payload.specialty = formData.specialty;
      if (formData.biography !== undefined)
        payload.biography = formData.biography;
      if (formData.file !== undefined) payload.file = formData.file;

      if (formData.experience !== undefined)
        payload.experience = formData.experience;
      if (formData.education !== undefined)
        payload.education = formData.education;
      if (formData.certifications !== undefined)
        payload.certifications = formData.certifications;
      if (formData.skills !== undefined) payload.skills = formData.skills;
      if (formData.socialMedia !== undefined)
        payload.socialMedia = formData.socialMedia;

      const updatedOrganizer = await updateOrganizer(
        state.organizer.id.toString(),
        payload,
      );

      set({
        organizer: updatedOrganizer,
        isLoading: false,
        error: null,
      });

      setTimeout(async () => {
        try {
          const freshData = await getProfileOrganizer();
          set({ organizer: freshData });
        } catch (error) {
          console.warn('Error al refrescar datos después de actualización:', error);
        }
      }, 100);

    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        isLoading: false,
      });
      throw error;
    }
  },

  StatusOrganizer: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedOrganizer = await statusverifyOrganizer(id);

      const currentOrganizer = get().organizer;
      if (currentOrganizer && currentOrganizer.id === id) {
        set({
          organizer: updatedOrganizer,
          isLoading: false,
          error: null,
        });
      }

      const { organizers } = get();
      const updatedOrganizers = organizers.map(org =>
        org.id === id ? { ...org, verified: updatedOrganizer.verified } : org
      );

      set({
        organizers: updatedOrganizers,
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

  deleteOrganizerProfile: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await deleteOrganizer(id);
      const { organizers, total } = get();
      set({
        organizers: organizers.filter((organizer) => organizer.id !== id),
        total: total - 1,
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

  setOrganizer: (organizer) => set({ organizer }),

  clearOrganizer: () =>
    set({
      organizer: null,
      organizers: [],
      total: 0,
      error: null,
      initialized: false,
    }),
}));

export const useOrganizerSelector = {
  useOrganizers: (): Organizer[] => useOrganizerStore((state) => state.organizers),
  useOrganizer: (): Organizer | null => useOrganizerStore((state) => state.organizer),
  useTotal: (): number => useOrganizerStore((state) => state.total),
  useIsLoading: (): boolean => useOrganizerStore((state) => state.isLoading),
  useError: (): string | null => useOrganizerStore((state) => state.error),
  useInitialized: (): boolean => useOrganizerStore((state) => state.initialized),

  useVerifiedOrganizers: (): Organizer[] =>
    useOrganizerStore((state) => state.organizers.filter(org => org.verified)),

  useUnverifiedOrganizers: (): Organizer[] =>
    useOrganizerStore((state) => state.organizers.filter(org => !org.verified)),

  useActiveOrganizers: (): Organizer[] =>
    useOrganizerStore((state) => state.organizers.filter(org => org.isActive)),

  useOrganizerById: (id: number): Organizer | undefined =>
    useOrganizerStore((state) => state.organizers.find(org => org.id === id)),
};

export const useOrganizerActions = () => {
  const store = useOrganizerStore();
  return {
    fetchOrganizerProfile: store.fetchOrganizerProfile,
    fetchOrganizers: store.fetchOrganizers,
    fetchOrganizer: store.fetchOrganizer,
    createOrganizerProfile: store.createOrganizerProfile,
    StatusOrganizer: store.StatusOrganizer,
    updateOrganizerProfile: store.updateOrganizerProfile,
    deleteOrganizerProfile: store.deleteOrganizerProfile,
    setOrganizer: store.setOrganizer,
    clearOrganizer: store.clearOrganizer,
  };
};