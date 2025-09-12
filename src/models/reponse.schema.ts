import { z } from "zod";

export const baseResponseSchema = z.object({
  statusCode: z.number(),
  error: z.null().or(z.string()),
  success: z.boolean(),
});

export const messageResponseSchema = baseResponseSchema.extend({
  message: z.string(),
});

export const dataResponseSchema = baseResponseSchema.extend({
  data: z.unknown(),
});
