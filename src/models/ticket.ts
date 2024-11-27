export interface TicketData {
  id: string;
  reserved: boolean;
  payed: boolean;
  clientName?: string;
  clientPhone?: string;
}
