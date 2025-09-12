import { RecordingStatus } from "@/enums/recording-status.enum";
import { VerificationStatus } from "@/enums/verification-status.enum";
import { z } from "zod";
import { commentSchema } from "../comment/comment.model";
import { fileSchema } from "../file/file.model";
import { ResourceTypes } from "@/enums/resource-types.enum";

const userSchema = z.object({
  id: z.string().nullable(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

const organizerSchema = z.object({
  id: z.number(),
  user: userSchema,
});

const subcategoriesSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    category: z.object({
      id: z.number(),
      title: z.string(),
    }),
  }),
);
const resourceSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  type: z.nativeEnum(ResourceTypes),
  file: z
    .object({
      id: z.number(),
      key: z.string().nullable(),
      isPublic: z.boolean(),
      publicUrl: z.string().nullable(),
    })
    .nullable(),
});
const recordingSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  status: z.nativeEnum(RecordingStatus),
  verificationStatus: z.nativeEnum(VerificationStatus),
  rating: z.string(),
  requirements: z.array(z.string()),
  learnings: z.array(z.string()),
  banner: fileSchema,
  organizer: organizerSchema,
  subcategories: subcategoriesSchema,
  comments: z.array(commentSchema),
  resources: z.array(resourceSchema),
  enrollments: z.array(
    z.object({
      id: z.number(),
    }),
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const recordingDetailSchema = z.object({
  recording: recordingSchema,
  students: z.number(),
});

export const recordingResponseSchema = z.object({
  status: z.number(),
  error: z.null().or(z.string()),
  success: z.boolean(),
  data: recordingDetailSchema,
});

export const recordingsResponseSchema = z.object({
  status: z.number(),
  error: z.null().or(z.string()),
  success: z.boolean(),
  data: z.object({
    recordings: z.array(recordingDetailSchema),
    total: z.number(),
  }),
});

export type Recording = z.infer<typeof recordingSchema>;
export type Resource = z.infer<typeof resourceSchema>;
export type RecordingDetail = z.infer<typeof recordingDetailSchema>;

export type RecordingResponse = z.infer<typeof recordingResponseSchema>;
export type RecordingsResponse = z.infer<typeof recordingsResponseSchema>;
