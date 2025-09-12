import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCategoryStore } from "@/store/category-subcategory.store";
import { Category } from "@/models/category/category-subcategory.model";
import { GetCategoriesQuery } from "@/types/category/category-subcategory.type";

export const useCategoriesLogic = () => {
  const {
    categories,
    pagination,
    isLoading,
    error,
    success,
    message,
    fetchCategories,
    addCategory,
    editCategory,
  } = useCategoryStore();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<{ title: string }>({ title: "" });
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const pageSize = 10;

  const loadCategories = (page = 0) => {
    const query: GetCategoriesQuery = {
      offset: page * pageSize,
      limit: pageSize,
    };
    fetchCategories(query);
    setCurrentPage(page);
  };

  useEffect(() => {
    loadCategories(0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCategories(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (success && message) {
      toast.success(message);
    }
  }, [success, message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const filteredCategories = categories.filter((category) =>
    category.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (selectedCategory) {
        await editCategory(selectedCategory.id, {
          title: formData.title,
          id: selectedCategory.id,
        });
      } else {
        await addCategory({
          title: formData.title,
        });
      }
      handleCloseModal();
      loadCategories(currentPage);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ha ocurrido un error";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setFormData({ title: "" });
    setFormError("");
  };

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setSelectedCategory(category);
      setFormData({ title: category.title });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  return {
    categories: filteredCategories,
    pagination,
    isLoading,
    selectedCategory,
    isModalOpen,
    searchTerm,
    formData,
    formError,
    isSubmitting,
    currentPage,
    pageSize,
    setSearchTerm,
    setFormData,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    loadCategories,
  };
};