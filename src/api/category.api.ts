import api from "@/lib/axios";
import {
  CategoriesResponse,
  CategoryResponse,
  CreateCategoryResponse,
  CreateSubcategoryResponse,
  DeleteResponse,
  SubcategoriesResponse,
  UpdateResponse,
} from "@/models/category/category-subcategory.model";
import {
  CreateCategoryForm,
  CreateSubcategoryForm,
  DeleteCategoryForm,
  DeleteSubcategoryForm,
  GetCategoriesQuery,
  GetCategoryOne,
  GetSubCategoriesQuery,
  UpdateCategoryForm,
  UpdateSubcategoryForm,
} from "@/types/category/category-subcategory.type";
import { isAxiosError } from "axios";

export async function createCategory(formData: CreateCategoryForm) {
  try {
    const url = "/categories";
    const { data } = await api.post<CreateCategoryResponse>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function updateCategory(id: number, formData: UpdateCategoryForm) {
  try {
    const url = `/categories/${id}`;
    const { data } = await api.put<UpdateResponse>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function getCategoriesAll(query: GetCategoriesQuery) {
  const { offset, limit } = query;
  try {
    const url = `/categories?limit=${limit}&offset=${offset}`;
    const { data } = await api.get<CategoriesResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function getCategory(query: GetCategoryOne) {
  const { id } = query;
  try {
    const url = `/categories/${id}`;
    const { data } = await api.get<CategoryResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function deleteCategory(data: DeleteCategoryForm) {
  const { id } = data;
  try {
    const url = `/categories/${id}`;
    const { data } = await api.delete<DeleteResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function createSubcategory(formData: CreateSubcategoryForm) {
  try {
    const url = `/subcategories`;
    const { data } = await api.post<CreateSubcategoryResponse>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function updateSubcategory(formData: UpdateSubcategoryForm) {
  const { id, ...res } = formData;
  try {
    const url = `/subcategories/${id}`;
    const { data } = await api.put<UpdateResponse>(url, res);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function searchCategirySubcategories(
  query: GetSubCategoriesQuery,
) {
  const { term, categoryId, offset, limit } = query;

  try {
    let url = `/subcategories/category/${categoryId}?`;

    if (term) {
      url += `term=${term}&`;
    }

    url += `limit=${limit}&offset=${offset}`;

    const { data } = await api.get<SubcategoriesResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function deleteSubcategory(data: DeleteSubcategoryForm) {
  const { id } = data;
  try {
    const url = `subcategories/${id}`;
    const { data } = await api.delete<DeleteResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
