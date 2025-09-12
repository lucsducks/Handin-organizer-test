import { z } from "zod";

const baseUserSchema = z.object({
  id: z.string().nullable(),
  firstName: z.string(),
  lastName: z.string(),
});

export const commentSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.number(),
    comment: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: baseUserSchema,
  }),
);

export const commentResponseSchema = z.object({
  status: z.number(),
  error: z.null().or(z.string()),
  success: z.boolean(),
  data: commentSchema,
});

export const commentsResponseSchema = z.object({
  status: z.number(),
  error: z.null().or(z.string()),
  success: z.boolean(),
  data: z.object({
    comments: z.array(commentSchema),
    total: z.number(),
  }),
});

export type Comment = z.infer<typeof commentSchema>;
export type CommentResponse = z.infer<typeof commentResponseSchema>;
export type CommentsResponse = z.infer<typeof commentsResponseSchema>;
