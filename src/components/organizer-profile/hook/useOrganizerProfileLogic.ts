import { useMemo } from "react";
import { Organizer } from "@/models/organizer/organizer.model";

export const useOrganizerProfileLogic = (organizer: Organizer) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const generateUniqueId = () => {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const organizerName = useMemo(() => {
    return `${organizer.user?.firstName || ''} ${organizer.user?.lastName || ''}`.trim();
  }, [organizer.user]);

  const hasValidSkills = useMemo((): boolean => {
    return Boolean(organizer.skills && organizer.skills.length > 0);
  }, [organizer.skills]);

  const validEducation = useMemo(() => {
    return organizer.education?.filter(edu =>
      edu.institution && edu.degree && edu.field
    ) || [];
  }, [organizer.education]);

  const validExperience = useMemo(() => {
    return organizer.experience?.filter(exp =>
      exp.company && exp.position && exp.description
    ) || [];
  }, [organizer.experience]);

  const validCertifications = useMemo(() => {
    return organizer.certifications?.filter(cert =>
      cert.name && cert.institution
    ) || [];
  }, [organizer.certifications]);

  const validSocialMedia = useMemo(() => {
    if (!organizer.socialMedia) return [];

    return Object.entries(organizer.socialMedia).filter(([_, value]) =>
      value && value.trim()
    );
  }, [organizer.socialMedia]);

  const filteredSkills = useMemo(() => {
    return organizer.skills?.filter(skill =>
      skill && skill.trim() && skill.trim() !== ""
    ) || [];
  }, [organizer.skills]);

  return {
    formatDate,
    generateUniqueId,
    organizerName,
    hasValidSkills,
    validEducation,
    validExperience,
    validCertifications,
    validSocialMedia,
    filteredSkills,
  };
};