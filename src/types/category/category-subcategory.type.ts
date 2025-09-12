import {
  Category,
  Subcategory,
} from "@/models/category/category-subcategory.model";

export type CreateCategoryForm = {
  title: string;
};
export type UpdateCategoryForm = {
  title: string;
  id: number;
};
export type GetCategoriesQuery = {
  offset: number;
  limit: number;
};
export type GetCategoryOne = Pick<Category, "id">;
export type DeleteCategoryForm = Pick<Category, "id">;

export type CreateSubcategoryForm = {
  title: string;
  categoryId: number;
};

export type UpdateSubcategoryForm = {
  title: string;
  categoryId: number;
  id: number;
};
export type GetSubCategoriesQuery = {
  term?: string;
  categoryId: number;
  offset: number;
  limit: number;
};
export type DeleteSubcategoryForm = Pick<Subcategory, "id">;
