import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrganizerSelector, useOrganizerActions } from "@/store/organizer.store";

export const useOrganizerListLogic = () => {
  const organizers = useOrganizerSelector.useOrganizers();
  const total = useOrganizerSelector.useTotal();
  const isLoading = useOrganizerSelector.useIsLoading();
  const error = useOrganizerSelector.useError();

  const { fetchOrganizers } = useOrganizerActions();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrganizers();
  }, [fetchOrganizers]);

  const filteredOrganizers = useMemo(() => {
    if (!organizers || organizers.length === 0) return [];

    return organizers.filter((organizer) => {
      const term = searchTerm.toLowerCase();
      return (
        organizer.user?.firstName?.toLowerCase().includes(term) ||
        organizer.user?.lastName?.toLowerCase().includes(term) ||
        organizer.user?.email?.toLowerCase().includes(term) ||
        organizer.specialty?.toLowerCase().includes(term) ||
        organizer.degree?.toLowerCase().includes(term)
      );
    });
  }, [organizers, searchTerm]);

  const statistics = useMemo(() => {
    if (!organizers || organizers.length === 0) {
      return {
        total: 0,
        verified: 0,
        unverified: 0,
        active: 0,
        inactive: 0,
      };
    }

    return {
      total: organizers.length,
      verified: organizers.filter(org => org.verified).length,
      unverified: organizers.filter(org => !org.verified).length,
      active: organizers.filter(org => org.isActive).length,
      inactive: organizers.filter(org => !org.isActive).length,
    };
  }, [organizers]);

  const handleNavigateToOrganizer = (organizerId: number) => {
    navigate(`/dashboard/organizer-admin/${organizerId}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return {
    organizers,
    total,
    filteredOrganizers,
    statistics,

    isLoading,
    error,
    searchTerm,

    setSearchTerm,
    handleSearch,
    clearSearch,
    handleNavigateToOrganizer,
    refetch: fetchOrganizers,
  };
};