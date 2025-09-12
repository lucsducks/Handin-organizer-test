import { RecordingStatus } from "@/enums/recording-status.enum";
import { Recording } from "@/models/recording/recording.model";

export type CreateRecordingOrganizerForm = {
  organizerId: number;
  title: string;
  description: string;
  price: number;
  status: RecordingStatus;
  categoryId: number;
  subcategories: string[];
  requirements: string[];
  learnings: string[];
  banner: File | null;
};
export type GetRecordingsQuery = {
  offset: number;
  limit: number;
  term?: string;
  unverfiedRecordings?: boolean;
};
export type UpdateRecordingOrganizerForm = Partial<{
  id: number;
  organizerId: number;
  title: string;
  description: string;
  price: number;
  status: RecordingStatus;
  categoryId: number;
  subcategories: string[];
  requirements: string[];
  learnings: string[];
  banner: File | null;
}>;

export type GetOneRecordingOrganizer = Pick<Recording, "id">;

export type DeleteRecordingOrganizer = Pick<Recording, "id">;
