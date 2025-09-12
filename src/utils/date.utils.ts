import { ConferenceStatus } from "@/enums/conference-status.enum";
import { addHours, format, formatDistanceToNow } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";

export const dateUtils = {
  getUserTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  },

  formatDateTime(date: string | Date): string {
    const timeZone = this.getUserTimeZone();
    return formatInTimeZone(
      new Date(date),
      timeZone,
      "d 'de' MMMM 'de' yyyy 'a las' h:mm aa",
      { locale: es },
    );
  },

  toUTC(localDate: string): string {
    const date = new Date(localDate);
    return date.toISOString().replace(/\.\d{3}Z$/, "Z");
  },

  toLocalInput(utcDate: string): string {
    const timeZone = this.getUserTimeZone();
    const localDate = toZonedTime(new Date(utcDate), timeZone);
    return format(localDate, "yyyy-MM-dd'T'HH:mm");
  },

  getMinDateTime(): string {
    const now = new Date();
    const minDate = addHours(now, 2);
    return format(minDate, "yyyy-MM-dd'T'HH:mm");
  },

  shouldShowActionButtons(
    startDate: Date | string,
    status: ConferenceStatus,
  ): boolean {
    const now = new Date();
    const conferenceStart = new Date(startDate);
    if (status === ConferenceStatus.ON_GOING) {
      return true;
    }
    const diffInMs = conferenceStart.getTime() - now.getTime();
    const diffInMinutes = diffInMs / (1000 * 60);
    return diffInMinutes <= 15 && diffInMinutes >= 0;
  },

  formatTimeAgo(updatedAt: string) {
    const date = new Date(updatedAt);
    const distance = formatDistanceToNow(date, { addSuffix: true, locale: es });

    return distance.replace(/alrededor de /, "");
  },
};
