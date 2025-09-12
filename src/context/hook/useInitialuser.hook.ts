import { isCheckingToken } from "@/api/auth.api";
import { useOrganizerStore } from "@/store/organizer.store";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../auth.context";

export const useInitializeAuth = (onInitialized?: () => void) => {
  const setUser = useAuthStore((state) => state.setUser);
  const isInitialized = useRef(false);
  const fetchOrganizerProfile = useOrganizerStore(
    (state) => state.fetchOrganizerProfile,
  );

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const initializeAuth = async () => {
      try {
        const token = Cookies.get("auth_token");
        if (token) {
          const response = await isCheckingToken();

          if (response) {
            setUser(response);

            const isOrganizer = response.user.roles?.includes("Organizador");

            if (isOrganizer) {
              await fetchOrganizerProfile();
            }
          }
        }
      } catch (error) {
      } finally {
        if (onInitialized) {
          onInitialized();
        }
      }
    };

    initializeAuth();
  }, [setUser, onInitialized, fetchOrganizerProfile]);
};
