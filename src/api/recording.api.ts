import api from "@/lib/axios";
import { RecordingResponse, RecordingsResponse } from "@/models/recording/recording.model";
import {
  CreateRecordingOrganizerForm,
  GetRecordingsQuery,
  UpdateRecordingOrganizerForm,
} from "@/types/recording/recording.type";
import { isAxiosError } from "axios";

export async function getRecordingsByOrganizer(query: GetRecordingsQuery) {
  const { offset, limit, term, unverfiedRecordings } = query;

  try {
    let url = `/recordings/search/organizer?`;
    if (unverfiedRecordings) {
      url += `unverfiedRecordings=true&`;
    }
    if (term) {
      url += `term=${term}&`;
    }
    url += `limit=${limit}&offset=${offset}`;
    const { data } = await api.get<RecordingsResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function getOrganizerRecordingById(id: number) {
  try {
    const url = `/recordings/${id}/organizer`;
    const { data } = await api.get<RecordingResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
export async function createRecording(formData: CreateRecordingOrganizerForm) {
  try {
    const form = new FormData();


    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price.toString());
    form.append("organizerId", formData.organizerId.toString());
    form.append("categoryId", formData.categoryId.toString());
    form.append("status", formData.status);
    form.append("subcategories", JSON.stringify(formData.subcategories));
    form.append("requirements", JSON.stringify(formData.requirements));
    form.append("learnings", JSON.stringify(formData.learnings));
    if (formData.banner) form.append("banner", formData.banner);

    const url = "/recordings";
    const { data } = await api.post<RecordingResponse>(url, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function updateRecording(formData: UpdateRecordingOrganizerForm) {
  try {
    const form = new FormData();
    if (formData.title) form.append("title", formData.title);
    if (formData.description) form.append("description", formData.description);
    if (formData.price !== undefined)
      form.append("price", formData.price.toString());
    if (formData.organizerId !== undefined)
      form.append("organizerId", formData.organizerId.toString());
    if (formData.categoryId !== undefined)
      form.append("categoryId", formData.categoryId.toString());
    if (formData.status) form.append("status", formData.status);
    if (formData.requirements) {
      form.append("requirements", JSON.stringify(formData.requirements));
    }
    if (formData.learnings) {
      form.append("learnings", JSON.stringify(formData.learnings));
    }
    if (formData.subcategories && formData.subcategories.length > 0) {
      form.append("subcategories", JSON.stringify(formData.subcategories));
    }
    if (formData.banner) form.append("banner", formData.banner);

    const url = `/recordings/${formData.id}`;
    const { data } = await api.put<RecordingResponse>(url, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
export async function getOrganizerRecording(id: number) {
  try {
    const url = `/recordings/${id}/organizer`;
    const { data } = await api.get<RecordingResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
export async function deleteRecording(id: number) {
  try {
    const url = `/recordings/${id}`;
    const { data } = await api.delete<RecordingResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}


export async function getRecordingsAdmin(query: GetRecordingsQuery) {
  const { offset, limit, term, unverfiedRecordings } = query;
  try {

    let url = `/recordings/search/admin?`;
    if (unverfiedRecordings) {
      url += `unverfiedRecordings=true&`;
    }
    if (term) {
      url += `term=${term}&`;
    }
    url += `limit=${limit}&offset=${offset}`;
    const { data } = await api.get<RecordingsResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
export async function approveRecording(id: number) {
  try {
    const url = `/recordings/${id}/verify`;
    await api.patch(url);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
export async function rejectRecording(id: number, reason: string) {
  try {
    const url = `/recordings/${id}/reject`;
    await api.patch(url, {
      reason,
    });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function getAdminRecording(id: number) {
  try {
    const url = `/recordings/${id}/admin`;
    const { data } = await api.get<RecordingResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
