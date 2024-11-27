import { TicketData } from "./ticket";

export interface RaffleData {
  name: string;
  description: string;
  price?: number;
  prize: string;
  ticketsNumber: 10 | 100 | 1000;
  id?: string;
  tickets?: TicketData[];
}
