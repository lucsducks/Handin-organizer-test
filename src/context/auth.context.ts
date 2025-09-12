import { getProfileOrganizer } from "@/api/organizer.api";
import {
  apiUpdateUser,
  updateProfilePictureService,
  updateUserPassword,
} from "@/api/user.api";
import type { UserAuth } from "@/models/user/user.model";
import {
  ChangePasswordFields,
  UpdatePictureFields,
  UpdateUserForm,
} from "@/types/user/user.type";
import Cookies from "js-cookie";
import { create } from "zustand";

interface AuthState {
  user: UserAuth | null;
  isAuthenticated: boolean;
  organizerId: number | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: UserAuth | null) => void;
  logout: () => void;
  addOrganizerRole: (organizerId: number) => void;
  setOrganizerId: (organizerId: number | null) => void;
  initializeOrganizerId: () => Promise<void>;
  updateUser: (updatedUser: UpdateUserForm) => Promise<void>;
  changePassword: (data: ChangePasswordFields) => Promise<void>;
  updateProfilePicture: (data: UpdatePictureFields) => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  organizerId: null,
  isLoading: false,
  error: null,

  setUser: (user) => {
    if (user && user.user.roles) {
      set({
        user,
        isAuthenticated: true,
      });
      if (user.user.roles.includes("Organizador")) {
        get().initializeOrganizerId();
      } else {
        set({ organizerId: null });
      }
    } else {
      set({
        user: null,
        isAuthenticated: false,
        organizerId: null,
      });
    }
  },

  logout: () => {
    Cookies.remove("auth_token");
    set({
      user: null,
      isAuthenticated: false,
      organizerId: null,
    });
  },

  addOrganizerRole: (organizerId: number) => {
    const currentUser = get().user;
    if (currentUser) {
      if (!currentUser.user.roles.includes("Organizador")) {
        set({
          user: {
            ...currentUser,
            user: {
              ...currentUser.user,
              roles: [...currentUser.user.roles, "Organizador"],
            },
          },
          organizerId,
        });
      }
    }
  },
  setOrganizerId: (organizerId: number | null) =>
    set({
      organizerId,
    }),

  initializeOrganizerId: async () => {
    try {
      const response = await getProfileOrganizer();
      if (response && response.id) {
        set({ organizerId: response.id });
      }
    } catch (error) {
      set({ organizerId: null });
    }
  },

  updateUser: async (updatedUser: UpdateUserForm) => {
    set({ isLoading: true, error: null });
    try {
      await apiUpdateUser(updatedUser);
      const currentUser = get().user;
      if (currentUser) {
        set({
          user: {
            ...currentUser,
            ...updatedUser,
          },
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: (error as Error).message,
        isLoading: false,
      });
    }
  },

  changePassword: async (data: ChangePasswordFields) => {
    set({ isLoading: true, error: null });
    try {
      await updateUserPassword(data);
      set({ isLoading: false });
    } catch (error) {
      set({
        error: (error as Error).message,
        isLoading: false,
      });
      throw error;
    }
  },
  updateProfilePicture: async (data: UpdatePictureFields) => {
    set({ isLoading: true, error: null });
    try {
      const response = await updateProfilePictureService(data);

      const currentUser = get().user;
      if (
        currentUser &&
        response &&
        response.data &&
        response.data.profilePicture
      ) {
        set({
          user: {
            ...currentUser,
            user: {
              ...currentUser.user,
              profilePicture: response.data.profilePicture,
            },
          },
          isLoading: false,
        });
      } else if (currentUser && response && response.data) {
        set({
          user: {
            ...currentUser,
            user: {
              ...currentUser.user,
              profilePicture: response.data,
            },
          },
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({
        error: (error as Error).message,
        isLoading: false,
      });
      throw error;
    }
  },
}));
