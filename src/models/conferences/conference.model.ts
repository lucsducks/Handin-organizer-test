import { ConferenceStatus } from "@/enums/conference-status.enum";
import { ConferenceTypes } from "@/enums/conference-types.enum";
import { z } from "zod";

const hostConferenceSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
  roles: z.array(z.string()).optional(),
  updatedAt: z.string().optional(),
  profilePicture: z.string().nullable().optional(),
});

const conferenceBannerSchema = z.object({
  id: z.number().optional(),
  key: z.string().optional(),
  isPublic: z.boolean(),
  publicUrl: z.string(),
});

const categorySchema = z.object({
  id: z.number(),
  title: z.string(),
  subcategories: z.array(z.object({
    id: z.number(),
    title: z.string(),
  })).optional(),
});

const subcategorySchema = z.object({
  id: z.number(),
  title: z.string(),
  category: categorySchema,
});

const seatSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string().optional(),
  price: z.string(),
  maxParticipants: z.number().optional(),
});

const conferenceSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  virtualPrice: z.number().nullable().optional(),
  startDate: z.string(),
  location: z.string().nullable().optional(),
  maxVirtualParticipants: z.number().nullable().optional(),
  type: z.nativeEnum(ConferenceTypes),
  status: z.nativeEnum(ConferenceStatus),
  createdAt: z.string().optional(),
  updatedAt: z.string(),
  host: hostConferenceSchema,
  banner: conferenceBannerSchema,
  subcategories: z.array(subcategorySchema),
  seats: z.array(seatSchema),
});

const attendeesSchema = z.object({
  inPersonAttendees: z.number(),
  virtualAttendees: z.number().nullable(),
});

const conferenceDetailSchema = z.object({
  conference: conferenceSchema,
  attendees: attendeesSchema,
});

const conferenceByIdSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  virtualPrice: z.number().nullable().optional(),
  startDate: z.string(),
  location: z.string().nullable().optional(),
  maxVirtualParticipants: z.number().nullable().optional(),
  type: z.nativeEnum(ConferenceTypes),
  status: z.nativeEnum(ConferenceStatus),
  createdAt: z.string().optional(),
  updatedAt: z.string(),
  host: z.object({
    id: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
  }),
  banner: z.object({
    isPublic: z.boolean(),
    publicUrl: z.string(),
  }),
  subcategories: z.array(subcategorySchema),
  seats: z.array(seatSchema),
  enrollments: z.array(z.any()).optional(),
});

export const conferenceResponseSchema = z.object({
  message: z.string().optional(),
  data: conferenceSchema,
  success: z.boolean(),
  statusCode: z.number(),
});

export const conferencesResponseSchema = z.object({
  data: z.object({
    conferences: z.array(conferenceDetailSchema),
    total: z.number(),
  }),
  success: z.boolean(),
  statusCode: z.number(),
});

export const conferenceByIdResponseSchema = z.object({
  data: z.object({
    conference: conferenceByIdSchema,
    attendees: attendeesSchema,
  }),
  success: z.boolean(),
  statusCode: z.number(),
});

export const conferenceJoinResponseSchema = z.object({
  status: z.number(),
  error: z.null().or(z.string()),
  success: z.boolean(),
  token: z.string(),
});

export type Conference = z.infer<typeof conferenceSchema>;
export type ConferenceDetail = z.infer<typeof conferenceDetailSchema>;
export type ConferenceAttendees = z.infer<typeof attendeesSchema>;
export type ConferenceSeat = z.infer<typeof seatSchema>;
export type ConferenceHost = z.infer<typeof hostConferenceSchema>;
export type ConferenceBanner = z.infer<typeof conferenceBannerSchema>;
export type ConferenceSubcategory = z.infer<typeof subcategorySchema>;
export type ConferenceCategory = z.infer<typeof categorySchema>;

export type ConferenceResponse = z.infer<typeof conferenceResponseSchema>;
export type ConferencesResponse = z.infer<typeof conferencesResponseSchema>;
export type ConferenceByIdResponse = z.infer<typeof conferenceByIdResponseSchema>;
export type ConferenceById = z.infer<typeof conferenceByIdSchema>;
export type ConferenceJoinResponse = z.infer<typeof conferenceJoinResponseSchema>;