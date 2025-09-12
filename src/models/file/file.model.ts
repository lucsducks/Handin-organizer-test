import { z } from "zod";

export const fileSchema = z.object({
  id: z.number(),
  key: z.string(),
  isPublic: z.boolean(),
  publicUrl: z.string(),
});

export type File = z.infer<typeof fileSchema>;
