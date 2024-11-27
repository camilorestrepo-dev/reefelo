import { addDoc, collection, doc, writeBatch } from "firebase/firestore";
import { RaffleData } from "../../models/raffle";
import { db } from "../firebase";
import { RAFFLES, TICKETS } from "../collections";

export class RaffleService {
  static save = async (raffle: RaffleData) => {
    let tickets = raffle.tickets;
    if (!tickets) {
      const digits = Math.log10(raffle.ticketsNumber);
      tickets = Array(raffle.ticketsNumber)
        .fill(null)
        .map((_, index) => ({
          id: String(index).padStart(digits, "0"),
          enabled: true,
          payed: false,
        }));
    }
    const newRaffle = {
      ...raffle,
    };
    const createdDoc = await addDoc(collection(db, RAFFLES), newRaffle);
    newRaffle.id = createdDoc.id;

    const batch = writeBatch(db);
    for (const ticket of tickets) {
      batch.set(doc(db, RAFFLES, newRaffle.id, TICKETS, ticket.id), ticket);
    }
    await batch.commit();

    return newRaffle;
  };
}
