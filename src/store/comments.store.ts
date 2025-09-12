import { getSectionComments } from "@/api/comment.api";
import { Comment } from "@/models/comment/comment.model";
import { create } from "zustand";

export type GetCommentsQuery = {
  offset: number;
  limit: number;
  rating: number;
  term: string;
};

interface CommentState {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  totalComments: number;
  currentQuery: GetCommentsQuery;
  hasMore: boolean;

  fetchRecordingComments: (recordingId: number, query?: Partial<GetCommentsQuery>) => Promise<void>;
  loadMoreComments: (recordingId: number) => Promise<void>;
  setQuery: (query: Partial<GetCommentsQuery>) => void;
  resetQuery: () => void;
  clearComments: () => void;
}

const defaultQuery: GetCommentsQuery = {
  offset: 0,
  limit: 10,
  rating: 0,
  term: "",
};

export const useCommentStore = create<CommentState>((set, get) => ({
  comments: [],
  isLoading: false,
  error: null,
  initialized: false,
  totalComments: 0,
  currentQuery: defaultQuery,
  hasMore: true,

  fetchRecordingComments: async (recordingId: number, queryParams?: Partial<GetCommentsQuery>) => {
    if (get().isLoading) return;

    const currentQuery = get().currentQuery;
    const newQuery = { ...currentQuery, ...queryParams };

    if (queryParams && (queryParams.term !== undefined || queryParams.rating !== undefined)) {
      newQuery.offset = 0;
    }

    set({
      isLoading: true,
      error: null,
      currentQuery: newQuery,
      comments: newQuery.offset === 0 ? [] : get().comments
    });

    try {
      const response = await getSectionComments(recordingId, newQuery);
      const newComments = response.data.comments;

      set({
        comments: newQuery.offset === 0
          ? newComments
          : [...get().comments, ...newComments],
        totalComments: response.data.total || newComments.length,
        hasMore: newComments.length === newQuery.limit,
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

  loadMoreComments: async (recordingId: number) => {
    const { currentQuery, hasMore, isLoading } = get();

    if (!hasMore || isLoading) return;

    const nextQuery = {
      ...currentQuery,
      offset: currentQuery.offset + currentQuery.limit,
    };

    await get().fetchRecordingComments(recordingId, nextQuery);
  },

  setQuery: (queryParams: Partial<GetCommentsQuery>) => {
    const currentQuery = get().currentQuery;
    const newQuery = { ...currentQuery, ...queryParams };
    set({ currentQuery: newQuery });
  },

  resetQuery: () => {
    set({
      currentQuery: defaultQuery,
      comments: [],
      hasMore: true,
      totalComments: 0,
      initialized: false
    });
  },

  clearComments: () => set({
    comments: [],
    error: null,
    initialized: false,
    totalComments: 0,
    hasMore: true,
    currentQuery: defaultQuery
  }),
}));