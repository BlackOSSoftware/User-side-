export type EnquiryItem = {
  _id: string;
  ticketId: string;
  contactName?: string;
  subject: string;
  ticketType: string;
  description: string;
  contactEmail: string;
  contactNumber: string;
  status: string;
  source?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateEnquiryPayload = {
  contactName: string;
  subject: string;
  ticketType?: string;
  description: string;
  contactEmail: string;
  contactNumber: string;
};
