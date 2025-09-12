import {
  createResource,
  deleteResource,
} from "@/api/resource.api";
import { Resource } from "@/models/recording/recording.model";
import {
  CreateResourceForm,
} from "@/types/recording/resource.type";
import { create } from "zustand";

interface ResourceState {
  resources: Resource[];
  isLoading: boolean;
  error: string | null;

  createResource: (formData: CreateResourceForm, onSuccess?: () => void) => Promise<void>;
  removeResource: (id: number, onSuccess?: () => void) => Promise<void>;

  setResources: (resources: Resource[]) => void;
  clearStore: () => void;
}

export const useResourceStore = create<ResourceState>(
  (set, get) => ({
    resources: [],
    isLoading: false,
    error: null,

    createResource: async (formData: CreateResourceForm, onSuccess?: () => void) => {
      set({ isLoading: true, error: null });
      try {
        await createResource(formData);

        const updatedResources = [...get().resources];

        set({
          resources: updatedResources,
          isLoading: false,
          error: null,
        });

        if (onSuccess) {
          onSuccess();
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

    removeResource: async (id: number, onSuccess?: () => void) => {
      set({ isLoading: true, error: null });
      try {
        await deleteResource(id);

        const updatedResources = get().resources.filter(
          (resource) => resource.id !== id
        );

        set({
          resources: updatedResources,
          isLoading: false,
          error: null,
        });

        if (onSuccess) {
          onSuccess();
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

    setResources: (resources) => set({ resources }),
    clearStore: () =>
      set({
        resources: [],
        error: null,
      }),
  }),
);

export const useResourceState = () =>
  useResourceStore((state) => ({
    resources: state.resources,
    isLoading: state.isLoading,
    error: state.error,
  }));

export const useResourceActions = () =>
  useResourceStore((state) => ({
    createResource: state.createResource,
    removeResource: state.removeResource,
    setResources: state.setResources,
    clearStore: state.clearStore,
  }));