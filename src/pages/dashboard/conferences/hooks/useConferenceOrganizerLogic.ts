import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEnrollmentsByConference } from "@/api/conference-enrollments.api";
import { ConferenceStatus } from "@/enums/conference-status.enum";
import { ConferenceTypes } from "@/enums/conference-types.enum";
import { usePagination } from "@/hooks/usePagination";
import { Conference } from "@/models/conferences/conference.model";
import { ConferenceEnrollments } from "@/models/enrollments/conference-enrollment.model";
import { useConferenceOrganizerStore } from "@/store/conference-organizer.store";
import { CreateConferenceForm, CreateConferenceSeatDto, UpdateConferenceForm } from "@/types/conference/conference.type";


export const useConferenceOrganizerLogic = () => {
  const navigate = useNavigate();

  const {
    conferences = [],
    total,
    fetchConferences,
    createConference,
    updateConference,

    joinConference,
    updateConferenceStatus,
    getConferenceById
  } = useConferenceOrganizerStore();

  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);
  const [selectedConferenceEnrollments, setSelectedConferenceEnrollments] = useState<ConferenceEnrollments | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEnrollmentsOpen, setIsModalEnrollmentsOpen] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isChangeState, setIsChangeState] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const pageSize = 10;
  const [categoyIdRe, setCategoyIdRe] = useState(0);
  const [formData, setFormData] = useState<CreateConferenceForm>({
    title: "",
    description: "",
    startDate: "",
    type: ConferenceTypes.VIRTUAL,
    location: "",
    virtualPrice: 0,
    maxVirtualParticipants: 0,
    inPersonPrices: [],
    categoryId: 0,
    subcategories: [],
    banner: null,
  });
  const [formError, setFormError] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    currentPage,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    getPaginationInfo,
  } = usePagination({
    total: total,
    pageSize,
    loadData: loadConferences,
    debouncedSearchTerm,
  });

  function loadConferences(page = 0, search = "") {
    const query = {
      offset: page * pageSize,
      limit: pageSize,
      term: search,
    };
    fetchConferences(query);

    setTimeout(() => {
      if (document.activeElement === searchInputRef.current) {
        searchInputRef.current?.focus();
      }
    }, 100);
  }

  useEffect(() => {
    loadConferences(0);
  }, [fetchConferences]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      loadConferences(0, searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const addSeat = () => {
    const newSeat: CreateConferenceSeatDto = {
      name: "",
      description: "",
      price: 0,
      maxParticipants: 0,
    };
    setFormData({
      ...formData,
      inPersonPrices: [...(formData.inPersonPrices || []), newSeat],
    });
  };

  const removeSeat = (index: number) => {
    const updatedSeats = formData.inPersonPrices?.filter((_, i) => i !== index) || [];
    setFormData({
      ...formData,
      inPersonPrices: updatedSeats,
    });
  };
  const setCategoryId = (categoryId: number) => {
    setCategoyIdRe(categoryId);
    setFormData(prev => ({
      ...prev,
      categoryId: categoryId
    }));
  };

  const updateSeat = (index: number, seat: CreateConferenceSeatDto) => {
    const updatedSeats = [...(formData.inPersonPrices || [])];
    updatedSeats[index] = seat;
    setFormData({
      ...formData,
      inPersonPrices: updatedSeats,
    });
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setFormError("El título es requerido");
      return false;
    }
    if (!formData.description.trim()) {
      setFormError("La descripción es requerida");
      return false;
    }

    if (formData.type === ConferenceTypes.IN_PERSON || formData.type === ConferenceTypes.HYBRID) {
      if (!formData.inPersonPrices || formData.inPersonPrices.length === 0) {
        setFormError("Debe agregar al menos un tipo de entrada para conferencias presenciales");
        return false;
      }

      for (const seat of formData.inPersonPrices) {
        if (!seat.name.trim()) {
          setFormError("Todos los tipos de entrada deben tener un nombre");
          return false;
        }
        if (Number(seat.price) < 0) {
          setFormError("Los precios no pueden ser negativos");
          return false;
        }
        if (seat.maxParticipants && seat.maxParticipants <= 0) {
          setFormError("El aforo de cada entrada debe ser mayor que 0");
          return false;
        }
      }

      if (!formData.location?.trim()) {
        setFormError("La ubicación es requerida para conferencias presenciales");
        return false;
      }
    }

    if (formData.type === ConferenceTypes.VIRTUAL || formData.type === ConferenceTypes.HYBRID) {
      if ((formData.virtualPrice ?? 0) < 0) {
        setFormError("El precio virtual no puede ser negativo");
        return false;
      }
      if ((formData.maxVirtualParticipants ?? 0) <= 0) {
        setFormError("El aforo virtual es requerido y debe ser mayor que 0");
        return false;
      }
    }

    if (!formData.startDate && !selectedConference) {
      setFormError("La fecha de inicio es requerida");
      return false;
    }

    if (!selectedConference) {
      const currentDate = new Date();
      const selectedDate = new Date(formData.startDate);
      const diffInHours = (selectedDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60);
      if (diffInHours < 24) {
        setFormError("La conferencia debe programarse con al menos 24 horas de anticipación");
        return false;
      }
    }

    formData.categoryId = categoyIdRe;
    if (!formData.categoryId || formData.categoryId === 0) {
      setFormError("La categoría es requerida");
      return false;
    }
    if (!formData.subcategories || formData.subcategories.length === 0 || formData.subcategories.some((subcategory) => !subcategory.trim())) {
      setFormError("Debe haber al menos una subcategoría válida");
      return false;
    }
    if (!selectedConference && !formData.banner) {
      setFormError("La imagen es requerida");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setSelectedConference(null);
    setFormData({
      title: "",
      description: "",
      startDate: "",
      type: ConferenceTypes.VIRTUAL,
      location: "",
      virtualPrice: 0,
      maxVirtualParticipants: 0,
      inPersonPrices: [],
      categoryId: 0,
      subcategories: [],
      banner: null,
    });
    setFormError("");
    setImagePreview("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setFormError("Por favor selecciona un archivo de imagen válido");
        return;
      }
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        setFormError("La imagen no debe exceder 2MB");
        return;
      }

      const fileName = file.name.replace(/\s+/g, "_");
      const newFile = new File([file], fileName, {
        type: file.type,
        lastModified: file.lastModified,
      });

      setFormData({ ...formData, banner: newFile });
      setFormError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (selectedConference) {
        let startDateToUse;
        if (formData.startDate) {
          const originalDate = new Date(formData.startDate);
          startDateToUse = originalDate.toISOString().split(".")[0] + "Z";
        } else {
          const originalDate = new Date(selectedConference.startDate);
          startDateToUse = originalDate.toISOString().split(".")[0] + "Z";
        }

        const updateData: UpdateConferenceForm = {
          id: selectedConference.id,
          title: formData.title,
          description: formData.description,
          startDate: startDateToUse,
          type: formData.type,
          location: formData.location,
          virtualPrice: formData.virtualPrice,
          maxVirtualParticipants: formData.maxVirtualParticipants,
          inPersonPrices: formData.inPersonPrices,
          categoryId: formData.categoryId,
          subcategories: formData.subcategories,
          banner: formData.banner,
        };

        await updateConference(selectedConference.id, updateData);
        toast.success("Conferencia actualizada exitosamente");
      } else {
        const createData: CreateConferenceForm = {
          title: formData.title,
          description: formData.description,
          startDate: formData.startDate,
          type: formData.type,
          location: formData.location,
          virtualPrice: formData.virtualPrice,
          maxVirtualParticipants: formData.maxVirtualParticipants,
          inPersonPrices: formData.inPersonPrices,
          categoryId: formData.categoryId,
          subcategories: formData.subcategories,
          banner: formData.banner,
        };

        await createConference(createData);
        toast.success("Conferencia creada exitosamente");
      }
      handleCloseModal();
      loadConferences(currentPage, debouncedSearchTerm);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ha ocurrido un error";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenModal = async (conference?: Conference) => {
    if (conference) {
      const resConference = await getConferenceById(conference.id);
      const conferenceData = resConference!.conference;
      setSelectedConference(conferenceData);

      const categoryId = conferenceData.subcategories[0]!.category!.id;
      setCategoyIdRe(categoryId);

      const subcategories = conferenceData.subcategories?.map((subcategory) => subcategory.title) || [];

      setFormData({
        title: conferenceData.title,
        description: conferenceData.description,
        startDate: conferenceData.startDate,
        type: conferenceData.type,
        location: conferenceData.location || "",
        virtualPrice: Number(conferenceData.virtualPrice ?? 0),
        maxVirtualParticipants: Number(conferenceData.maxVirtualParticipants ?? 0),
        inPersonPrices: conferenceData.seats?.map(seat => ({
          name: seat.name,
          description: seat.description || "",
          price: parseFloat(seat.price.toString()),
          maxParticipants: seat.maxParticipants,
        })) || [],
        categoryId: categoryId,
        subcategories: subcategories,
        banner: null,
      });
      setImagePreview(conferenceData.banner.publicUrl || "");
      setIsModalOpen(true);
    } else {
      resetForm();
      setIsModalOpen(true);
    }
  };

  const handleOpenEnrollmentsModal = async (conference: Conference) => {
    try {
      const resEnrollments = await getEnrollmentsByConference(conference.id);
      const enrollmentsData = resEnrollments.data;
      setSelectedConference(conference);
      setSelectedConferenceEnrollments(enrollmentsData);
      setIsModalEnrollmentsOpen(true);
    } catch (error) {
      setIsModalEnrollmentsOpen(false);
      toast.error("Ocurrió un error, vuelva a intentarlo");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleJoin = async (id: number, startDate: string, name: string) => {
    const now = new Date();
    const conferenceTime = new Date(startDate);
    const joinTime = new Date(conferenceTime.getTime() - 15 * 60 * 1000);
    if (now < joinTime) {
      const timeUntilJoin = joinTime.getTime() - now.getTime();
      const minutes = Math.ceil(timeUntilJoin / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      let timeMessage = "";
      if (hours > 0) {
        timeMessage += `${hours} hora${hours > 1 ? "s" : ""}`;
        if (remainingMinutes > 0) {
          timeMessage += ` y ${remainingMinutes} minuto${remainingMinutes > 1 ? "s" : ""}`;
        }
      } else {
        timeMessage = `${minutes} minuto${minutes > 1 ? "s" : ""}`;
      }

      toast.error(`Podrás unirte a la conferencia en ${timeMessage}`);
      return;
    }

    setIsJoining(true);
    try {
      await joinConference(id.toString());
      navigate(`/dashboard/conferences/${id}/conference-room/${name}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error al unirse a la conferencia";
      toast.error(message);
    } finally {
      setIsJoining(false);
    }
  };

  const handleStartConference = async (conference: Conference) => {
    setIsChangeState(true);
    try {
      await updateConferenceStatus(conference?.id.toString() || "", ConferenceStatus.ON_GOING);
      setIsChangeState(false);
      loadConferences(currentPage, debouncedSearchTerm);
      toast.success("Conferencia iniciada con éxito");
    } catch (error) {
      setIsChangeState(false);
      toast.error("No se pudo iniciar la conferencia, intente de nuevo");
    }
  };

  const handleFinishConference = async (conference: Conference) => {
    setIsChangeState(true);
    try {
      await updateConferenceStatus(conference?.id.toString() || "", ConferenceStatus.FINISHED);
      setIsChangeState(false);
      loadConferences(currentPage, debouncedSearchTerm);
      toast.success("Conferencia finalizada con éxito");
    } catch (error) {
      setIsChangeState(false);
      toast.error("No se pudo finalizar la conferencia, intente de nuevo");
    }
  };

  return {
    conferences,
    total,
    selectedConference,
    selectedConferenceEnrollments,
    isModalOpen,
    isModalEnrollmentsOpen,
    isJoining,
    isChangeState,
    isSubmitting,
    searchTerm,
    debouncedSearchTerm,
    formData,
    formError,
    imagePreview,
    searchInputRef,

    setSearchTerm,
    setFormData,
    setFormError,
    setImagePreview,
    handleFileChange,
    handleSubmit,
    validateForm,
    resetForm,

    setIsModalOpen,
    setIsModalEnrollmentsOpen,
    handleOpenModal,
    handleOpenEnrollmentsModal,
    handleCloseModal,

    handleJoin,
    handleStartConference,
    handleFinishConference,
    loadConferences,

    addSeat,
    removeSeat,
    updateSeat,
    setCategoryId,

    categoyIdRe,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    getPaginationInfo,
  };
};