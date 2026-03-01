import { apiClient } from "@/services/http/client";
import type { EconomicCalendarItem } from "./economic-calendar.types";

export async function getEconomicCalendar(params?: Record<string, string | number | boolean | undefined>): Promise<EconomicCalendarItem[]> {
  const response = await apiClient.get<EconomicCalendarItem[]>("/economic-calendar", { params });
  return response.data;
}
