import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDashboardTicket, getDashboardTickets } from "./dashboard-ticket.service";
import type { CreateDashboardTicketPayload } from "./dashboard-ticket.types";

export const DASHBOARD_TICKETS_QUERY_KEY = ["dashboard", "tickets"] as const;

export function useDashboardTicketsQuery(enabled = true) {
  return useQuery({
    queryKey: DASHBOARD_TICKETS_QUERY_KEY,
    queryFn: getDashboardTickets,
    enabled,
  });
}

export function useCreateDashboardTicketMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateDashboardTicketPayload) => createDashboardTicket(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_TICKETS_QUERY_KEY });
    },
  });
}
