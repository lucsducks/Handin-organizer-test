import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecordingStore } from "@/store/recording.store";
import { usePagination } from "@/hooks/usePagination";

export const useRecordingsAdminLogic = () => {
  const navigate = useNavigate();
  const {
    recordings = [],
    total,
    isLoading,
    fetchRecordingsAdmin,
  } = useRecordingStore();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showUnverifiedOnly, setShowUnverifiedOnly] = useState(false);

  const pageSize = 10;

  const loadRecordings = (
    page = 0,
    search = "",
    unverified = showUnverifiedOnly,
  ) => {
    const query = {
      offset: page * pageSize,
      limit: pageSize,
      term: search,
      unverfiedRecordings: unverified,
    };

    if (unverified) {
      query.unverfiedRecordings = true;
    }

    fetchRecordingsAdmin(query);

    setTimeout(() => {
      if (document.activeElement === searchInputRef.current) {
        searchInputRef.current?.focus();
      }
    }, 100);
  };

  useEffect(() => {
    loadRecordings(0);
  }, [fetchRecordingsAdmin]);

  const {
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    getPaginationInfo,
  } = usePagination({
    total: total,
    pageSize,
    loadData: (page) =>
      loadRecordings(page, debouncedSearchTerm, showUnverifiedOnly),
    debouncedSearchTerm,
  });

  useEffect(() => {
    loadRecordings(0, debouncedSearchTerm, showUnverifiedOnly);
  }, [showUnverifiedOnly]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      loadRecordings(0, searchTerm, showUnverifiedOnly);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleUnverifiedToggle = (checked: boolean) => {
    setShowUnverifiedOnly(checked);
    loadRecordings(0, searchTerm, checked);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    searchInputRef.current?.focus();
  };

  const navigateToRecordingContent = (recordingId: string) => {
    navigate(`/dashboard/recordings-admin/${recordingId}/resources`);
  };

  return {
    recordings,
    total,
    isLoading,
    searchTerm,
    debouncedSearchTerm,
    searchInputRef,
    showUnverifiedOnly,

    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    getPaginationInfo,
    setSearchTerm,
    setShowUnverifiedOnly,
    handleUnverifiedToggle,
    handleClearSearch,
    navigateToRecordingContent,
    loadRecordings,
  };
};
