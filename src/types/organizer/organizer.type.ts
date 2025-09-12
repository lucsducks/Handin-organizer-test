import { Organizer } from "@/models/organizer/organizer.model";

export type NewOrganizerForm = {
  degree: string;
  specialty: string;
  biography: string;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: string[];
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    researchGate?: string;
    googleScholar?: string;
  };
  file: File;
};

export type Experience = {
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
};

export type Education = {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
};

export type Certification = {
  name: string;
  institution: string;
  issueDate: string;
  expirationDate: string | null;
  credentialId?: string;
  url?: string;
};

export type SocialMedia = {
  platform: string;
  url: string;
};

export type UpdateOrganizerForm = Partial<{
  degree: string;
  specialty: string;
  biography: string;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: string[];
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    researchGate?: string;
    googleScholar?: string;
  };
  file: File;
}>;

export type GetOneOrganizer = Pick<Organizer, "id">;

export type OrganizerListResponse = {
  data: {
    organizers: Organizer[];
    total: number;
  };
  success: boolean;
  statusCode: number;
};

export type OrganizerSingleResponse = {
  data: Organizer;
  success: boolean;
  statusCode: number;
};

export type OrganizerListItem = Pick<
  Organizer,
  'id' | 'degree' | 'specialty' | 'verified' | 'isActive' | 'updatedAt' | 'user'
>;

export type OrganizerDetail = Required<Organizer>;