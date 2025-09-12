import { PrivateFiles } from "@/enums/file-type.enum";
import api from "@/lib/axios";
import { CreateResourceForm } from "@/types/recording/resource.type";
import { isAxiosError } from "axios";

interface getPresignedUrlResponse {
  statusCode: number;
  error: string;
  data: string;
}

export async function getPresignedUrl(
  key: string,
  fileType: PrivateFiles,
  resourceId: number,
) {
  try {
    const url = `/files/presigned?key=${key}&fileType=${fileType}&resourceId=${resourceId}`;
    const { data } = await api.get<getPresignedUrlResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function createResource(formData: CreateResourceForm) {
  try {
    const form = new FormData();
    form.append("title", formData.title);
    form.append("recordingId", formData.recordingId.toString());
    form.append("description", formData.description);
    form.append("type", formData.type);
    if (formData.file) {
      form.append("file", formData.file);
    }
    if (formData.url) {
      form.append("url", formData.url);
    }
    const url = "/resources";
    await api.post(url, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function deleteResource(id: number) {
  try {
    const url = `/resources/${id}`;
    await api.delete(url);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
