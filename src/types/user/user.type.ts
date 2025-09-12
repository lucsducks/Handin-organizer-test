import { User, } from "@/models/user/user.model";

export type LoginUserForm = {
  email: string;
  password: string;
};

export type UpdateUserPassForm = {
  id: string;
  newPassword: string;
};

export type UpdatePrivilegyUserForm = {
  id: string;
  password: string;
};

export type UpdateUserForm = {
  firstName: string;
  lastName: string;
  phone: string;
};

export type ForgotPasswordEmailForm = {
  email: string;
};

export type CreateUserForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  code: string;
};
export type ChangePasswordFields = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type UpdatePictureFields = {
  photo: File | null
}

export type DeleteUserForm = Pick<User, "id">;
export type ResendCodeEmail = Pick<User, "email">;
export type GetOneIdUser = Pick<User, "id">;
