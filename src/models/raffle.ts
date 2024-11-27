import { TicketData } from "./ticket";

export type PowerOfTen = 10 | 100 | 1000;

export interface RaffleData {
  name: string;
  description: string;
  price?: number;
  prize: string;
  ticketsNumber: PowerOfTen;
  id?: string;
  tickets?: TicketData[];
}
