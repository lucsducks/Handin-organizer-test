import {
  createCategory,
  createSubcategory,
  deleteCategory,
  deleteSubcategory,
  getCategoriesAll,
  getCategory,
  searchCategirySubcategories,
  updateCategory,
  updateSubcategory,
} from "@/api/category.api";
import {
  Category,
  Subcategory,
} from "@/models/category/category-subcategory.model";
import {
  CreateCategoryForm,
  CreateSubcategoryForm,
  DeleteCategoryForm,
  DeleteSubcategoryForm,
  GetCategoriesQuery,
  GetSubCategoriesQuery,
  UpdateCategoryForm,
  UpdateSubcategoryForm,
} from "@/types/category/category-subcategory.type";
import { create } from "zustand";

interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
  subcategories: Subcategory[];
  isLoading: boolean;
  error: string | null;
  statusCode: number | null;
  success: boolean | null;
  message: string | null;
  pagination: {
    total: number;
    offset: number;
    limit: number;
  };
  subcategoriesPagination: {
    total: number;
    offset: number;
    limit: number;
  };

  fetchCategories: (query: GetCategoriesQuery) => Promise<void>;
  fetchCategory: (id: number) => Promise<void>;
  addCategory: (formData: CreateCategoryForm) => Promise<void>;
  editCategory: (id: number, formData: UpdateCategoryForm) => Promise<void>;
  removeCategory: (data: DeleteCategoryForm) => Promise<void>;

  fetchSubcategories: (query: GetSubCategoriesQuery) => Promise<void>;
  addSubcategory: (formData: CreateSubcategoryForm) => Promise<void>;
  editSubcategory: (formData: UpdateSubcategoryForm) => Promise<void>;
  removeSubcategory: (data: DeleteSubcategoryForm) => Promise<void>;

  resetCurrentCategory: () => void;
  resetError: () => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  currentCategory: null,
  subcategories: [],
  isLoading: false,
  error: null,
  statusCode: null,
  success: null,
  message: null,
  pagination: {
    total: 0,
    offset: 0,
    limit: 10,
  },
  subcategoriesPagination: {
    total: 0,
    offset: 0,
    limit: 10,
  },

  fetchCategories: async (query) => {
    set({
      isLoading: true,
      error: null,
      statusCode: null,
      success: null,
      message: null,
    });
    try {
      const response = await getCategoriesAll(query);
      const categoriesWithSubs = response.data.categories.map((category) => ({
        ...category,
        subcategories: [],
      }));

      set({
        categories: categoriesWithSubs,
        pagination: {
          total: response.data.total,
          offset: query.offset,
          limit: query.limit,
        },
        statusCode: response.statusCode,
        success: response.success,
        error: response.error,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        success: false,
        isLoading: false,
      });
    }
  },

  fetchCategory: async (id) => {
    set({
      isLoading: true,
      error: null,
      statusCode: null,
      success: null,
      message: null,
    });
    try {
      const response = await getCategory({ id });
      set({
        currentCategory: response.data,
        statusCode: response.statusCode,
        success: response.success,
        error: response.error,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        success: false,
        isLoading: false,
      });
    }
  },

  addCategory: async (formData) => {
    set({
      isLoading: true,
      error: null,
      statusCode: null,
      success: null,
      message: null,
    });
    try {
      const response = await createCategory(formData);
      const newCategory: Category = {
        ...response.data,
        subcategories: [],
      };

      set((state) => ({
        categories: [...state.categories, newCategory],
        statusCode: response.statusCode,
        success: response.success,
        error: response.error,
        message: response.message,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        success: false,
        isLoading: false,
      });
    }
  },

  editCategory: async (id, formData) => {
    set({
      isLoading: true,
      error: null,
      statusCode: null,
      success: null,
      message: null,
    });
    try {
      const response = await updateCategory(id, formData);
      set((state) => ({
        categories: state.categories.map((category) =>
          category.id === id
            ? {
                ...category,
                title: formData.title,
              }
            : category,
        ),
        currentCategory:
          state.currentCategory?.id === id
            ? { ...state.currentCategory, title: formData.title }
            : state.currentCategory,
        statusCode: response?.statusCode,
        success: response?.success,
        error: response?.error,
        message: response?.message,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        success: false,
        isLoading: false,
      });
    }
  },

  removeCategory: async (data) => {
    set({
      isLoading: true,
      error: null,
      statusCode: null,
      success: null,
      message: null,
    });
    try {
      const response = await deleteCategory(data);
      set((state) => ({
        categories: state.categories.filter(
          (category) => category.id !== data.id,
        ),
        statusCode: response?.statusCode,
        success: response?.success,
        error: response?.error,
        message: response?.message,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        success: false,
        isLoading: false,
      });
    }
  },

  fetchSubcategories: async (query) => {
    set({
      isLoading: true,
      error: null,
      statusCode: null,
      success: null,
      message: null,
    });
    try {
      const response = await searchCategirySubcategories(query);
      set({
        subcategories: response.data.subCategories,
        subcategoriesPagination: {
          total: response.data.total,
          offset: query.offset,
          limit: query.limit,
        },
        statusCode: response.statusCode,
        success: response.success,
        error: response.error,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        success: false,
        isLoading: false,
      });
    }
  },

  addSubcategory: async (formData) => {
    set({
      isLoading: true,
      error: null,
      statusCode: null,
      success: null,
      message: null,
    });
    try {
      const response = await createSubcategory(formData);
      const newSubcategory: Subcategory = {
        id: response.data.id,
        title: response.data.title,
      };

      set((state) => ({
        subcategories: [...state.subcategories, newSubcategory],
        categories: state.categories.map((category) => {
          if (category.id === formData.categoryId) {
            return {
              ...category,
              subcategories: [...category.subcategories, newSubcategory],
            };
          }
          return category;
        }),
        statusCode: response.statusCode,
        success: response.success,
        error: response.error,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        success: false,
        isLoading: false,
      });
    }
  },

  editSubcategory: async (formData) => {
    const { id } = formData;
    set({
      isLoading: true,
      error: null,
      statusCode: null,
      success: null,
      message: null,
    });
    try {
      const response = await updateSubcategory(formData);
      set((state) => ({
        subcategories: state.subcategories.map((subcategory) =>
          subcategory.id === id
            ? { ...subcategory, title: formData.title }
            : subcategory,
        ),
        statusCode: response?.statusCode,
        success: response?.success,
        error: response?.error,
        message: response?.message,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        success: false,
        isLoading: false,
      });
    }
  },

  removeSubcategory: async (data) => {
    set({
      isLoading: true,
      error: null,
      statusCode: null,
      success: null,
      message: null,
    });
    try {
      const response = await deleteSubcategory(data);
      set((state) => {
        const updatedSubcategories = state.subcategories.filter(
          (subcategory) => subcategory.id !== data.id,
        );

        const updatedCategories = state.categories.map((category) => {
          return {
            ...category,
            subcategories: category.subcategories.filter(
              (subcategory) => subcategory.id !== data.id,
            ),
          };
        });

        return {
          subcategories: updatedSubcategories,
          categories: updatedCategories,
          statusCode: response?.statusCode,
          success: response?.success,
          error: response?.error,
          message: response?.message,
          isLoading: false,
        };
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        success: false,
        isLoading: false,
      });
    }
  },

  resetCurrentCategory: () => set({ currentCategory: null }),
  resetError: () =>
    set({
      error: null,
      statusCode: null,
      success: null,
      message: null,
    }),
}));
