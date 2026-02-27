import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTicket, getTickets } from "./ticket.service";
import type { CreateTicketPayload } from "./ticket.types";

export const TICKETS_QUERY_KEY = ["support", "tickets"] as const;

export function useTicketsQuery(enabled = true) {
  return useQuery({
    queryKey: TICKETS_QUERY_KEY,
    queryFn: getTickets,
    enabled,
  });
}

export function useCreateTicketMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTicketPayload) => createTicket(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TICKETS_QUERY_KEY });
    },
  });
}
