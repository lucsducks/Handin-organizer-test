import { ConferenceTypes } from "@/enums/conference-types.enum";
import { ConferenceStatus } from "@/enums/conference-status.enum";

export type CreateConferenceSeatDto = {
  name: string;
  description?: string;
  price: number;
  maxParticipants?: number;
};

export type CreateConferenceForm = {
  title: string;
  description: string;
  startDate: string;
  type: ConferenceTypes;
  location?: string;
  virtualPrice?: number;
  maxVirtualParticipants?: number;
  inPersonPrices?: CreateConferenceSeatDto[];
  categoryId: number;
  subcategories: string[];
  banner: File | null;
};

export type UpdateConferenceForm = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  type: ConferenceTypes;
  location?: string;
  virtualPrice?: number;
  maxVirtualParticipants?: number;
  inPersonPrices?: CreateConferenceSeatDto[];
  categoryId: number;
  subcategories: string[];
  banner: File | null;
  status?: ConferenceStatus;
};

export type JoinConferenceForm = {
  conferenceId: string;
  seatId?: number;
  attendanceType?: 'virtual' | 'inPerson';
};

export type GetConferencesQuery = {
  offset: number;
  limit: number;
  term?: string;
  status?: ConferenceStatus;
  type?: ConferenceTypes;
  startDate?: string;
  endDate?: string;
};

export type GetConferenceById = {
  id: number;
};

export type DeleteConference = {
  id: number;
};

export type ConferencePaginationParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: ConferenceStatus;
  type?: ConferenceTypes;
};

export type ConferenceFilters = {
  status?: ConferenceStatus;
  type?: ConferenceTypes;
  categoryId?: number;
  startDate?: string;
  endDate?: string;
  priceRange?: {
    min: number;
    max: number;
  };
};

export type ConferenceStats = {
  totalConferences: number;
  upcomingConferences: number;
  completedConferences: number;
  cancelledConferences: number;
  totalAttendees: number;
  totalRevenue: number;
};

export type SeatReservation = {
  conferenceId: number;
  seatId: number;
  userId: string;
  reservedAt: string;
  expiresAt: string;
};