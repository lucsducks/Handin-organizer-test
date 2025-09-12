import { z } from "zod";
import {
  baseResponseSchema,
  dataResponseSchema,
  messageResponseSchema,
} from "../reponse.schema";

const baseItemSchema = z.object({
  id: z.number(),
  title: z.string(),
});

const subcategorySchema = baseItemSchema;

const categoryWithSubsSchema = baseItemSchema.extend({
  subcategories: z.array(baseItemSchema),
});

export const categoryResponseSchema = dataResponseSchema.extend({
  data: categoryWithSubsSchema,
});

export const categoriesResponseSchema = dataResponseSchema.extend({
  data: z.object({
    categories: z.array(baseItemSchema),
    total: z.number(),
  }),
});

export const subcategoryResponseSchema = dataResponseSchema.extend({
  data: subcategorySchema,
});

export const subcategoriesResponseSchema = dataResponseSchema.extend({
  data: z.object({
    subCategories: z.array(baseItemSchema),
    total: z.number(),
  }),
});

export const createCategoryResponseSchema = messageResponseSchema.extend({
  data: baseItemSchema,
});

export const createSubcategoryResponseSchema = baseResponseSchema.extend({
  data: z.object({
    id: z.number(),
    title: z.string(),
    category: baseItemSchema,
  }),
});

export const updateResponseSchema = messageResponseSchema;

export const deleteResponseSchema = messageResponseSchema;

export type BaseItem = z.infer<typeof baseItemSchema>;
export type Category = z.infer<typeof categoryWithSubsSchema>;
export type Subcategory = z.infer<typeof subcategorySchema>;

export type CategoryResponse = z.infer<typeof categoryResponseSchema>;
export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>;
export type SubcategoryResponse = z.infer<typeof subcategoryResponseSchema>;
export type SubcategoriesResponse = z.infer<typeof subcategoriesResponseSchema>;

export type CreateCategoryResponse = z.infer<
  typeof createCategoryResponseSchema
>;
export type CreateSubcategoryResponse = z.infer<
  typeof createSubcategoryResponseSchema
>;

export type UpdateResponse = z.infer<typeof messageResponseSchema>;
export type DeleteResponse = z.infer<typeof messageResponseSchema>;
