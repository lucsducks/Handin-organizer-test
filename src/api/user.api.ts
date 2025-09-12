import api from "@/lib/axios";
import {
  ChangePasswordFields,
  UpdatePictureFields,
  UpdateUserForm,
} from "@/types/user/user.type";
import { isAxiosError } from "axios";

export async function apiUpdateUser(formData: UpdateUserForm) {
  try {
    const url = "users/profile";
    await api.put(url, formData);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function updateUserPassword(formData: ChangePasswordFields) {
  try {
    const url = "auth/change-password";

    const dataToSend = {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    };

    const response = await api.post(url, dataToSend);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Error al actualizar la contraseña",
      );
    }
    throw new Error(
      "No se pudo conectar con el servidor. Verifica tu conexión e inténtalo nuevamente.",
    );
  }
}

export async function updateProfilePictureService(
  formData: UpdatePictureFields,
) {
  try {
    const url = "users/profile/picture";

    const formDataToSend = new FormData();
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }

    const response = await api.put(url, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Error al actualizar la foto de perfil",
      );
    }
    throw new Error(
      "No se pudo conectar con el servidor. Verifica tu conexión e inténtalo nuevamente.",
    );
  }
}
