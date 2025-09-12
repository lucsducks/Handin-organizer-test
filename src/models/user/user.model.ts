import { z } from "zod";

export const roleSchema = z.array(z.string());
export const file = z.object({
  id: z.number(),
  key: z.string(),
  isPublic: z.boolean(),
  publicUrl: z.string(),
});

export const baseUserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  roles: roleSchema,
  isActive: z.boolean(),
  verified: z.boolean(),
  creationDate: z.string(),
  updatedAt: z.string(),
  phone: z.string().nullable(),
  profilePicture: file
});

export const userSchema = baseUserSchema;

export const userAuthSchema = z.object({
  token: z.string(),
  user: baseUserSchema,
});

export type User = z.infer<typeof userSchema>;
export type UserAuth = z.infer<typeof userAuthSchema>;

export const privilegySchema = z.object({
  userId: z.string(),
  roleId: z.string(),
});

export type Privilegy = z.infer<typeof privilegySchema>;

export const permissionSchema = z.object({
  id: z.string(),
  permissionName: z.string(),
  tagName: z.string(),
  roles: roleSchema,
});

export type Permission = z.infer<typeof permissionSchema>;

export const usersResponseSchema = z.array(userSchema);
export type UsersResponse = z.infer<typeof usersResponseSchema>;

export const userResponseSchema = z.object({
  status: z.number(),
  error: z.null().or(z.string()),
  success: z.boolean(),
  token: z.string(),
  data: userAuthSchema,
});

export type UserResponse = z.infer<typeof userResponseSchema>;

export const usersListResponseSchema = z.object({
  status: z.number(),
  error: z.null().or(z.string()),
  success: z.boolean(),
  data: usersResponseSchema,
});

export type UsersListResponse = z.infer<typeof usersListResponseSchema>;
