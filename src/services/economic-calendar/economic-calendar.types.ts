export type EconomicCalendarItem = {
  _id?: string;
  eventId?: string;
  country?: string;
  currency?: string;
  date?: string;
  event?: string;
  actual?: string;
  forecast?: string | null;
  previous?: string;
  impact?: string;
};
