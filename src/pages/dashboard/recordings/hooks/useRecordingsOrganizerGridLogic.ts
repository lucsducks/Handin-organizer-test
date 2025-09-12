
import { getOrganizerRecordingById } from "@/api/recording.api";
import { useAuthStore } from "@/context/auth.context";
import { RecordingStatus } from "@/enums/recording-status.enum";
import { usePagination } from "@/hooks/usePagination";
import { Recording } from "@/models/recording/recording.model";
import { useRecordingStore } from "@/store/recording.store";
import { CreateRecordingOrganizerForm } from "@/types/recording/recording.type";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useRecordingsOrganizerGridLogic = () => {
  const navigate = useNavigate();
  const organizerId = useAuthStore((state) => state.organizerId);
  const {
    recordings = [],
    error,
    total,
    isLoading,
    fetchRecordings,
    createRecording,
    updateRecording,
  } = useRecordingStore();

  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [formData, setFormData] = useState<CreateRecordingOrganizerForm>({
    organizerId: organizerId ? Number(organizerId) : 0,
    title: "",
    description: "",
    price: 0,
    status: RecordingStatus.DRAFT,
    categoryId: 0,
    subcategories: [],
    requirements: [""],
    learnings: [""],
    banner: null,
  });
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryIdSelect, setCategoryIdSelect] = useState(0);
  const [imagePreview, setImagePreview] = useState<string>("");

  const loadRecordings = (page = 0, search = "") => {
    const query = {
      offset: page * pageSize,
      limit: pageSize,
      term: search,
    };
    fetchRecordings(query);

    setTimeout(() => {
      if (document.activeElement === searchInputRef.current) {
        searchInputRef.current?.focus();
      }
    }, 100);
  };
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pageSize = 10;

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
    loadData: loadRecordings,
    debouncedSearchTerm,
  });



  useEffect(() => {
    loadRecordings(0);
  }, [fetchRecordings]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      loadRecordings(0, searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const resetForm = () => {
    setSelectedRecording(null);
    setFormData({
      organizerId: organizerId ? Number(organizerId) : 0,
      title: "",
      description: "",
      price: 0,
      status: RecordingStatus.DRAFT,
      categoryId: 0,
      subcategories: [],
      requirements: [""],
      learnings: [""],
      banner: null,
    });
    setFormError("");
    setImagePreview("");
  };

  const handleOpenModal = async (recording?: Recording) => {
    if (recording) {
      const resRecording = await getOrganizerRecordingById(recording.id);
      const recordingData = resRecording.data.recording;
      setSelectedRecording(recordingData);

      const categoryId = recordingData.subcategories[0].category.id;
      setCategoryIdSelect(categoryId);

      const subcategories =
        recordingData.subcategories?.map((subcategory) => subcategory.title) || [];

      setFormData({
        organizerId: organizerId ? Number(organizerId) : 0,
        title: recordingData.title,
        description: recordingData.description || "",
        price: parseFloat(recordingData.price),
        status: recordingData.status as RecordingStatus,
        categoryId: categoryId,
        subcategories: subcategories,
        requirements: recordingData.requirements,
        learnings: recordingData.learnings,
        banner: null,
      });
      setImagePreview(recording.banner.publicUrl || "");
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
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
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(newFile);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setFormError("El título es requerido");
      return false;
    }
    if (!formData.description.trim()) {
      setFormError("La descripción es requerida");
      return false;
    }
    if (formData.price < 0) {
      setFormError("El precio es requerido");
      return false;
    }
    if (!formData.categoryId && categoryIdSelect === 0) {
      setFormError("La categoría es requerida");
      return false;
    }
    if (
      !formData.subcategories ||
      formData.subcategories.length === 0 ||
      formData.subcategories.some((subcategory) => !subcategory.trim())
    ) {
      setFormError("Debe haber al menos una subcategoría válida");
      return false;
    }
    if (
      formData.requirements.length === 0 ||
      formData.requirements.some((req) => !req.trim())
    ) {
      setFormError("Los requisitos son requeridos y no pueden estar vacíos");
      return false;
    }
    if (
      formData.learnings.length === 0 ||
      formData.learnings.some((learning) => !learning.trim())
    ) {
      setFormError("Los aprendizajes son requeridos y no pueden estar vacíos");
      return false;
    }
    if (!selectedRecording && !formData.banner) {
      setFormError("La imagen es requerida");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (selectedRecording) {
        const updateData = {
          id: selectedRecording.id,
          organizerId: organizerId ? Number(organizerId) : 0,
          title: formData.title,
          description: formData.description,
          price: formData.price,
          status: formData.status,
          categoryId: categoryIdSelect,
          subcategories: formData.subcategories,
          requirements: formData.requirements,
          learnings: formData.learnings,
          banner: formData.banner,
        };
        await updateRecording(selectedRecording.id, updateData);
        toast.success("Grabación actualizada exitosamente");
      } else {
        const createData = {
          organizerId: organizerId ? Number(organizerId) : 0,
          title: formData.title,
          description: formData.description,
          price: formData.price,
          status: formData.status,
          categoryId: formData.categoryId,
          subcategories: formData.subcategories,
          requirements: formData.requirements,
          learnings: formData.learnings,
          banner: formData.banner,
        };
        await createRecording(createData);
        toast.success("Grabación creada exitosamente");
      }
      handleCloseModal();
      loadRecordings(currentPage, debouncedSearchTerm);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ha ocurrido un error";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigateToContent = (recordingId: number) => {
    navigate(`/dashboard/recordings-organizer/${recordingId}/resources`);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    searchInputRef.current?.focus();
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setFormData({ ...formData, banner: null });
  };

  return {

    recordings,
    error,
    total,
    isLoading,
    selectedRecording,
    isModalOpen,
    searchTerm,
    debouncedSearchTerm,
    formData,
    formError,
    isSubmitting,
    categoryIdSelect,
    imagePreview,
    searchInputRef,


    currentPage,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    getPaginationInfo,


    setSearchTerm,
    setFormData,
    setCategoryIdSelect,
    handleOpenModal,
    handleCloseModal,
    handleFileChange,
    handleSubmit,
    handleNavigateToContent,
    handleClearSearch,
    handleRemoveImage,
  };
};
