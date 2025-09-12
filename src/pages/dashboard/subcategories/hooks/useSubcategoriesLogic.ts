import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCategoryStore } from "@/store/category-subcategory.store";
import { Subcategory } from "@/models/category/category-subcategory.model";
import { GetSubCategoriesQuery } from "@/types/category/category-subcategory.type";

export const useSubcategoriesLogic = () => {
  const { categoryId, name } = useParams<{
    categoryId: string;
    name: string;
  }>();

  const {
    subcategories,
    subcategoriesPagination,
    isLoading,
    error,
    success,
    message,
    fetchSubcategories,
    addSubcategory,
    editSubcategory,
    removeSubcategory,
  } = useCategoryStore();

  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [formData, setFormData] = useState<{ title: string }>({ title: "" });
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const pageSize = 10;
  const numericCategoryId = categoryId ? parseInt(categoryId, 10) : 0;

  const loadSubcategories = (page = 0) => {
    if (numericCategoryId) {
      const query: GetSubCategoriesQuery = {
        categoryId: numericCategoryId,
        offset: page * pageSize,
        limit: pageSize,
        term: debouncedSearchTerm || undefined,
      };
      fetchSubcategories(query);
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    loadSubcategories(0);
  }, [numericCategoryId, debouncedSearchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (success && message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [success, message, error]);

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setFormError("El título es requerido");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !numericCategoryId) return;

    setIsSubmitting(true);
    try {
      if (selectedSubcategory) {
        await editSubcategory({
          id: selectedSubcategory.id,
          title: formData.title,
          categoryId: numericCategoryId,
        });
      } else {
        await addSubcategory({
          title: formData.title,
          categoryId: numericCategoryId,
        });
      }
      loadSubcategories(currentPage);
      handleCloseModal();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ha ocurrido un error";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedSubcategory) return;

    try {
      await removeSubcategory({ id: selectedSubcategory.id });
      loadSubcategories(currentPage);
      handleCloseDeleteDialog();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ha ocurrido un error";
      toast.error(message);
    }
  };

  const resetForm = () => {
    setSelectedSubcategory(null);
    setFormData({ title: "" });
    setFormError("");
  };

  const handleOpenModal = (subcategory?: Subcategory) => {
    if (subcategory) {
      setSelectedSubcategory(subcategory);
      setFormData({ title: subcategory.title });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleOpenDeleteDialog = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedSubcategory(null);
  };

  return {
    categoryName: name || "",
    subcategories,
    subcategoriesPagination,
    isLoading,
    selectedSubcategory,
    isModalOpen,
    isDeleteDialogOpen,
    searchTerm,
    debouncedSearchTerm,
    formData,
    formError,
    isSubmitting,
    currentPage,
    pageSize,
    setSearchTerm,
    setFormData,
    handleOpenModal,
    handleCloseModal,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleSubmit,
    handleDelete,
    loadSubcategories,
  };
};
