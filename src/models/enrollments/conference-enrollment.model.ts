import { ConferenceStatus } from "@/enums/conference-status.enum";
import { ConferenceTicketTypes } from "@/enums/conference-ticket-type.enum";
import { ConferenceTypes } from "@/enums/conference-types.enum";
import { z } from "zod";

const conferenceEnrollmentSchema = z.object({
  id: z.number(),
  ticketType: z.nativeEnum(ConferenceTicketTypes),
  attendedAt: z.boolean().nullable().default(false),
  user: z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  }),
  conference: z.object({
    id: z.number(),
    title: z.string(),
    type: z.nativeEnum(ConferenceTypes),
    status: z.nativeEnum(ConferenceStatus),
  }),
});

const conferenceEnrollmentsSchema = z.object({
  enrollments: z.array(conferenceEnrollmentSchema),
  total: z.number(),
});

const conferenceEnrollmentsResponseSchema = z.object({
  status: z.number(),
  error: z.null().or(z.string()),
  success: z.boolean(),
  data: conferenceEnrollmentsSchema,
});

export type ConferenceEnrollments = z.infer<typeof conferenceEnrollmentsSchema>;
export type ConferenceEnrollmentsResponse = z.infer<
  typeof conferenceEnrollmentsResponseSchema
>;
