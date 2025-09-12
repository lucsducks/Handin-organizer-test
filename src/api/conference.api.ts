import { ConferenceStatus } from "@/enums/conference-status.enum";
import api from "@/lib/axios";
import {
  ConferenceJoinResponse,
  ConferenceResponse,
  ConferencesResponse,
} from "@/models/conferences/conference.model";
import {
  CreateConferenceForm,
  GetConferencesQuery,
  UpdateConferenceForm,
} from "@/types/conference/conference.type";
import { isAxiosError } from "axios";

export async function getConferencesByHost(query: GetConferencesQuery) {
  const { offset, limit, term } = query;
  try {
    let url = `/conferences/host?`;
    if (term) {
      url += `term=${term}&`;
    }
    url += `limit=${limit}&offset=${offset}`;
    const { data } = await api.get<ConferencesResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}


export async function createConference(formData: CreateConferenceForm) {
  try {
    const form = new FormData();

    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("startDate", formData.startDate);
    form.append("type", formData.type);
    form.append("categoryId", formData.categoryId.toString());
    form.append("subcategories", JSON.stringify(formData.subcategories));

    if (formData.location) {
      form.append("location", formData.location);
    }

    if (formData.virtualPrice !== undefined) {
      form.append("virtualPrice", formData.virtualPrice.toString());
    }
    if (formData.maxVirtualParticipants !== undefined) {
      form.append("maxVirtualParticipants", formData.maxVirtualParticipants.toString());
    }

    if (formData.inPersonPrices && formData.inPersonPrices.length > 0) {
      form.append("inPersonPrices", JSON.stringify(formData.inPersonPrices));
    }

    if (formData.banner) {
      form.append("banner", formData.banner);
    }

    const url = "/conferences";
    const { data } = await api.post<ConferenceResponse>(url, form, {
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

export async function updateConference(
  id: number,
  formData: UpdateConferenceForm,
) {
  try {
    const form = new FormData();

    if (formData.title) form.append("title", formData.title);
    if (formData.description) form.append("description", formData.description);
    if (formData.startDate) form.append("startDate", formData.startDate);
    if (formData.type) form.append("type", formData.type);
    if (formData.location) form.append("location", formData.location);

    if (formData.virtualPrice !== undefined) {
      form.append("virtualPrice", formData.virtualPrice.toString());
    }
    if (formData.maxVirtualParticipants !== undefined) {
      form.append("maxVirtualParticipants", formData.maxVirtualParticipants.toString());
    }

    if (formData.inPersonPrices && formData.inPersonPrices.length > 0) {
      form.append("inPersonPrices", JSON.stringify(formData.inPersonPrices));
    }

    if (formData.categoryId) {
      form.append("categoryId", formData.categoryId.toString());
    }
    if (formData.subcategories && formData.subcategories.length > 0) {
      form.append("subcategories", JSON.stringify(formData.subcategories));
    }

    if (formData.banner) {
      form.append("banner", formData.banner);
    }

    const url = `/conferences/${id}`;
    const { data } = await api.patch<ConferenceResponse>(url, form, {
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

export async function updateConferenceStatus(
  id: string,
  status: ConferenceStatus,
) {
  try {
    const url = `/conferences/${id}/status`;
    await api.patch(url, {
      status: status,
    });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function deleteConference(id: number) {
  try {
    const url = `/conferences/${id}`;
    const { data } = await api.delete<ConferenceResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function joinConference(conferenceId: string) {
  try {
    const url = `/conferences/${conferenceId}/join`;
    const { data } = await api.post<ConferenceJoinResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function getConferencesByStatus(status: string) {
  try {
    const url = `/conferences/status/${status}`;
    const { data } = await api.get<ConferencesResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}