import api from "@/lib/axios";
import {
  OrganizerListResponse,
  OrganizerSingleResponse,
} from "@/models/organizer/organizer.model";
import {
  NewOrganizerForm,
  UpdateOrganizerForm,
} from "@/types/organizer/organizer.type";
import { isAxiosError } from "axios";

export async function createOrganizer(formData: NewOrganizerForm) {
  try {
    if (!formData.file) {
      throw new Error("Debes subir un Brochure en formato PDF");
    }

    const form = new FormData();
    form.append("degree", formData.degree);
    form.append("specialty", formData.specialty);
    form.append("biography", formData.biography);
    form.append("cv", formData.file);

    if (formData.experience && formData.experience.length > 0) {
      form.append("workExperience", JSON.stringify(formData.experience));
    }
    if (formData.education && formData.education.length > 0) {
      form.append("education", JSON.stringify(formData.education));
    }
    if (formData.certifications && formData.certifications.length > 0) {
      form.append("certifications", JSON.stringify(formData.certifications));
    }
    if (formData.skills && formData.skills.length > 0) {
      form.append("skills", JSON.stringify(formData.skills));
    }
    if (formData.socialMedia) {
      form.append("socialMedia", JSON.stringify(formData.socialMedia));
    }

    const url = "/organizers";
    const { data } = await api.post<OrganizerSingleResponse>(url, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data.message ||
            "Error al crear el perfil del profesor",
        );
      } else if (error.request) {
        throw new Error("No se recibió respuesta del servidor");
      } else {
        throw new Error("Error al configurar la solicitud");
      }
    }
    throw new Error("Error desconocido al crear el perfil del profesor");
  }
}

export async function statusverifyOrganizer(id: number) {
  try {
    const url = `/organizers/verify/${id}`;
    const { data } = await api.patch<OrganizerSingleResponse>(url);
    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function verifyOrganizer(id: number) {
  try {
    const url = `/organizers/verify/${id}`;
    const { data } = await api.patch(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function updateOrganizer(
  id: string,
  formData: UpdateOrganizerForm,
) {
  try {
    const form = new FormData();

    if (formData.degree !== undefined) form.append("degree", formData.degree);
    if (formData.specialty !== undefined)
      form.append("specialty", formData.specialty);
    if (formData.biography !== undefined)
      form.append("biography", formData.biography);

    if (formData.experience !== undefined) {
      form.append("workExperience", JSON.stringify(formData.experience));
    }
    if (formData.education !== undefined) {
      form.append("education", JSON.stringify(formData.education));
    }
    if (formData.certifications !== undefined) {
      form.append("certifications", JSON.stringify(formData.certifications));
    }
    if (formData.skills !== undefined) {
      form.append("skills", JSON.stringify(formData.skills));
    }
    if (formData.socialMedia !== undefined) {
      form.append("socialMedia", JSON.stringify(formData.socialMedia));
    }

    const url = `/organizers/${id}`;
    const { data } = await api.patch<OrganizerSingleResponse>(url, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data.message ||
            "Error al actualizar el perfil del profesor",
        );
      } else if (error.request) {
        throw new Error("No se recibió respuesta del servidor");
      } else {
        throw new Error("Error al configurar la solicitud");
      }
    }
    throw new Error("Error desconocido al actualizar el perfil del profesor");
  }
}

export async function deleteOrganizer(id: number): Promise<void> {
  try {
    const url = `/organizers/${id}`;
    await api.delete(url);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function getOrganizers() {
  try {
    const url = `/organizers/search/admin?limit=999&offset=0`;
    const { data } = await api.get<OrganizerListResponse>(url);
    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function getOrganizer(id: number) {
  try {
    const url = `/organizers/${id}/admin`;
    const { data } = await api.get<OrganizerSingleResponse>(url);
    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function getProfileOrganizer() {
  try {
    const url = `/organizers/profile`;
    const { data } = await api.get<OrganizerSingleResponse>(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
