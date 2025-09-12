import api from "@/lib/axios";
import { ConferenceEnrollmentsResponse } from "@/models/enrollments/conference-enrollment.model";
import { isAxiosError } from "axios";

export async function getEnrollmentsByConference(id: number) {
  try {
    const url = `/enrollments/conferences/${id}`;
    const { data } = await api.get<ConferenceEnrollmentsResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}


export async function markAttendance(conferenceId: number, conferenceEnrollmentId: number) {
  try {
    const url = `/enrollments/conferences/attendance/mark`;
    const { data } = await api.post<ConferenceEnrollmentsResponse>(url, {
      conferenceId,
      conferenceEnrollmentId,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function unmarkAttendance(conferenceId: number, conferenceEnrollmentId: number) {
  try {
    const url = `/enrollments/conferences/attendance/unmark`;
    const { data } = await api.post<ConferenceEnrollmentsResponse>(url, {
      conferenceId,
      conferenceEnrollmentId,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}