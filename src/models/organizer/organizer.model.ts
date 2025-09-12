import { z } from "zod";
import { fileSchema } from "../file/file.model";
import { dataResponseSchema } from "../reponse.schema";
import { baseUserSchema } from "../user/user.model";

const experienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  current: z.boolean(),
});

const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable(),
});

const certificationSchema = z.object({
  name: z.string(),
  institution: z.string(),
  issueDate: z.string(),
  expirationDate: z.string().nullable(),
  credentialId: z.string().optional(),
  url: z.string().optional(),
});

const organizerSchema = z.object({
  id: z.number(),
  degree: z.string(),
  specialty: z.string(),
  biography: z.string().optional(),
  user: baseUserSchema,
  cv: fileSchema.optional(),
  photo: z.string().nullable().optional(),
  experience: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
  skills: z.array(z.string()).optional(),
  socialMedia: z.record(z.string()).nullable().optional(),
  verified: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string(),
});

export const organizerListResponseSchema = dataResponseSchema.extend({
  data: z.object({
    organizers: z.array(organizerSchema),
    total: z.number(),
  }),
});

export const organizerSingleResponseSchema = dataResponseSchema.extend({
  data: organizerSchema,
});

export const organizerResponseSchema = z.union([
  organizerListResponseSchema,
  organizerSingleResponseSchema,
]);

export type Organizer = z.infer<typeof organizerSchema>;
export type OrganizerListResponse = z.infer<typeof organizerListResponseSchema>;
export type OrganizerSingleResponse = z.infer<typeof organizerSingleResponseSchema>;
export type OrganizerResponse = z.infer<typeof organizerResponseSchema>;