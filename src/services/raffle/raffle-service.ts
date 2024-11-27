import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  writeBatch,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { RaffleData } from "../../models/raffle";
import { db } from "../firebase";
import { RAFFLES, TICKETS } from "../collections";
import { AuthService } from "../auth/auth-service";

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
      userId: AuthService.currentUser().uid,
      createdAt: serverTimestamp(),
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

  static loadRaffles = async (limited: number): Promise<RaffleData[]> => {
    const q = query(
      collection(db, RAFFLES),
      where("userId", "==", AuthService.currentUser().uid),
      orderBy("createdAt", "desc"),
      limit(limited),
    );
    const querySnaps = await getDocs(q);
    const raffles: RaffleData[] = [];
    querySnaps.forEach((snap) => {
      const data = snap.data();
      const raffle: RaffleData = {
        name: data.name,
        description: data.description,
        price: data.price,
        prize: data.prize,
        ticketsNumber: data.ticketsNumber,
        id: snap.id,
        userId: data.userId,
        createdAt: (data.createdAt as Timestamp).toDate(),
      };
      raffles.push(raffle);
    });
    return raffles;
  };
}
