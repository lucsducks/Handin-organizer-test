import api from "@/lib/axios";
import {
  CommentsResponse,
} from "@/models/comment/comment.model";

import { isAxiosError } from "axios";
export type GetCommentsQuery = {
  offset: number;
  limit: number;
  rating: number;
  term: string;
};
export async function getSectionComments(recordingId: number, query: GetCommentsQuery) {
  try {
    const url = `/recording-comments/recording/${recordingId}`;
    const { data } = await api.get<CommentsResponse>(url, { params: query });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

