import type { UsersResponse } from "@/models/user/user.model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// import { updatePrivilegy } from "@/api/auth.api";
// import { UpdatePrivilegyUserForm } from "@/types/user/user.type";

interface UserState {
  users: UsersResponse;
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  setUsers: (users: UsersResponse) => void;
  // updatePrivilegy: (formData: UpdatePrivilegyUserForm) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      users: [],
      isLoading: false,
      error: null,

      fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      setUsers: (users) => set({ users }),

      // updatePrivilegy: async (formData: UpdatePrivilegyUserForm) => {
      //   set({ isLoading: true, error: null });
      //   try {
      //     await updatePrivilegy(formData);
      //     /* set((state) => ({
      //       users: state.users.map((user) =>
      //         user.id === formData.id ? { ...user, role: formData.role } : user
      //       ),
      //       isLoading: false
      //     }))*/
      //   } catch (error) {
      //     set({ error: (error as Error).message, isLoading: false });
      //   }
      // },
    }),
    {
      name: "user-management-storage",
      partialize: (state) => ({
        users: state.users,
      }),
    },
  ),
);
