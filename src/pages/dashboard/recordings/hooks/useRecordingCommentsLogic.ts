import { useState, useEffect, useCallback } from "react";
import { useCommentStore } from "@/store/comments.store";

export const useRecordingCommentsLogic = (recordingId: number) => {
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const comments = useCommentStore(state => state.comments);
    const isLoading = useCommentStore(state => state.isLoading);
    const error = useCommentStore(state => state.error);
    const totalComments = useCommentStore(state => state.totalComments);
    const hasMore = useCommentStore(state => state.hasMore);
    const fetchRecordingComments = useCommentStore(state => state.fetchRecordingComments);
    const loadMoreComments = useCommentStore(state => state.loadMoreComments);
    const setQuery = useCommentStore(state => state.setQuery);
    const resetQuery = useCommentStore(state => state.resetQuery);
    const clearComments = useCommentStore(state => state.clearComments);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleApplyFilters = useCallback(() => {
        const filters = {
            term: debouncedSearchTerm,
            rating: selectedRating,
        };

        setQuery(filters);
        fetchRecordingComments(recordingId, filters);
    }, [debouncedSearchTerm, selectedRating, recordingId, setQuery, fetchRecordingComments]);
    useEffect(() => {
        if (isCommentsModalOpen) {
            handleApplyFilters();
        }
    }, [isCommentsModalOpen, handleApplyFilters]);

    const openCommentsModal = useCallback(() => {
        setIsCommentsModalOpen(true);
        fetchRecordingComments(recordingId);
    }, [recordingId, fetchRecordingComments]);

    const closeCommentsModal = useCallback(() => {
        setIsCommentsModalOpen(false);
        clearComments();
        setSearchTerm("");
        setSelectedRating(0);
    }, [clearComments]);

    const handleResetFilters = useCallback(() => {
        setSearchTerm("");
        setSelectedRating(0);
        resetQuery();
        fetchRecordingComments(recordingId);
    }, [recordingId, resetQuery, fetchRecordingComments]);

    const handleLoadMore = useCallback(() => {
        if (hasMore && !isLoading) {
            loadMoreComments(recordingId);
        }
    }, [hasMore, isLoading, recordingId, loadMoreComments]);

    const handleSearchChange = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    const handleRatingChange = useCallback((rating: number) => {
        setSelectedRating(rating);
    }, []);

    const averageRating = comments.length > 0
        ? (comments.reduce((sum, comment) => sum + parseFloat(comment.rating), 0) / comments.length).toFixed(1)
        : '0.0';

    return {
        isCommentsModalOpen,
        openCommentsModal,
        closeCommentsModal,
        comments,
        isLoading,
        error,
        totalComments,
        hasMore,
        searchTerm,
        selectedRating,
        averageRating,
        handleSearchChange,
        handleRatingChange,
        handleApplyFilters,
        handleResetFilters,
        handleLoadMore,
    };
};