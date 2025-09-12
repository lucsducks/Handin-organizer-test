import api from "@/lib/axios";
import { UserResponse } from "@/models/user/user.model";
import {
  CreateUserForm,
  ForgotPasswordEmailForm,
  LoginUserForm,
  ResendCodeEmail, // UpdatePrivilegyUserForm,
} from "@/types/user/user.type";
import { isAxiosError } from "axios";
import Cookies from "js-cookie";

const handleAuthToken = (token: string) => {
  Cookies.set("auth_token", token, {
    expires: 7,
    secure: true,
    sameSite: "strict",
  });
};
export async function isCheckingToken() {
  try {
    const token = Cookies.get("auth_token");
    const url = `/auth/check-status?token=${token}`;
    const { data } = await api.get<UserResponse>(url);

    Cookies.set("auth_token", data.data.token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
export async function registerUser(formData: CreateUserForm) {
  try {
    const url = "/auth/register";
    const { data } = await api.post<UserResponse>(url, formData);
    if (data.data.token) {
      handleAuthToken(data.data.token);
    }

    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function loginUser(formData: LoginUserForm) {
  try {
    const url = "/auth/login";
    const { data } = await api.post<UserResponse>(url, formData);

    if (data.data.token) {
      handleAuthToken(data.data.token);
    }

    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function ForgotPasswordEmail(data: ForgotPasswordEmailForm) {
  try {
    const url = "/auth/forgot-password";
    await api.post(url, data);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function resendEmailCode(email: ResendCodeEmail) {
  try {
    const url = "/auth/code/send";
    const { data } = await api.post<string>(url, email);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

// export async function updatePrivilegy(formData: UpdatePrivilegyUserForm) {}

export async function authGoogle(tokenGoogle: string) {
  try {
    const url = "/auth/google";
    const { data } = await api.post<UserResponse>(url, { token: tokenGoogle });

    if (data.success && data.token) {
      handleAuthToken(data.token);
    }

    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
