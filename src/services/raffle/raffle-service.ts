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
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getNumber } from "firebase/remote-config";
import { FirebaseError } from "firebase/app";
import { RaffleData } from "../../models/raffle";
import { db, remoteConfig } from "../firebase";
import { RAFFLES, TICKETS } from "../collections";
import { AuthService } from "../auth/auth-service";
import { TicketData } from "../../models/ticket";
import { RaffleError } from "../raffle-error";

export class RaffleService {
  static saveRaffle = async (raffle: RaffleData) => {
    // Validate de max number of active raffles per user
    const maxRaffles = getNumber(remoteConfig, "maxRafflesPerUser");
    const q = query(collection(db, RAFFLES), where("userId", "==", AuthService.currentUser()?.uid));
    const querySnaps = await getDocs(q);
    if (querySnaps.size >= maxRaffles) {
      throw new RaffleError("maxRafflesPerUserExceeded");
    }

    let tickets = raffle.tickets;
    if (!tickets) {
      const digits = Math.log10(raffle.ticketsNumber);
      tickets = Array(raffle.ticketsNumber)
        .fill(null)
        .map((_, index) => ({
          id: String(index).padStart(digits, "0"),
          reserved: false,
          payed: false,
        }));
    }
    const newRaffle = {
      ...raffle,
      userId: AuthService.currentUser()?.uid,
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
      where("userId", "==", AuthService.currentUser()?.uid),
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

  static loadRaffle = async (raffleId: string): Promise<RaffleData> => {
    // Validate if user is owner of this raffle
    const docRef = doc(db, RAFFLES, raffleId);
    const docSnap = await getDoc(docRef);
    if (docSnap.data().userId !== AuthService.currentUser()?.uid) {
      throw new RaffleError("unauthorized");
    }

    const data = docSnap.data();
    const raffle: RaffleData = {
      name: data.name,
      description: data.description,
      price: data.price,
      prize: data.prize,
      ticketsNumber: data.ticketsNumber,
      id: docSnap.id,
      userId: data.userId,
      createdAt: (data.createdAt as Timestamp).toDate(),
    };

    return raffle;
  };

  static updateRaffle = async (raffle: RaffleData) => {
    // Validate if user is owner of this raffle
    const docRef = doc(db, RAFFLES, raffle.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.data().userId !== AuthService.currentUser()?.uid) {
      throw new RaffleError("unauthorized");
    }

    const newData: Partial<Pick<RaffleData, "name" | "description" | "price" | "prize">> = {
      description: raffle.description,
      name: raffle.name,
      price: raffle.price,
      prize: raffle.prize,
    };
    await updateDoc(docRef, newData);

    return newData;
  };

  static deleteRaffle = async (raffleId: string) => {
    // Validate if user is owner of this raffle
    const docRef = doc(db, RAFFLES, raffleId);
    const docSnap = await getDoc(docRef);
    if (docSnap.data().userId !== AuthService.currentUser()?.uid) {
      throw new RaffleError("unauthorized");
    }

    await deleteDoc(docRef);
  };

  static loadTickets = async (raffleId: string): Promise<TicketData[]> => {
    try {
      // Validate if user is owner of this raffle
      const docRef = doc(db, RAFFLES, raffleId);
      const docSnap = await getDoc(docRef);
      if (docSnap.data().userId !== AuthService.currentUser()?.uid) {
        throw new RaffleError("unauthorized");
      }

      // Query raffle tickets
      const q = query(collection(db, RAFFLES, raffleId, TICKETS), orderBy("id"));
      const querySnaps = await getDocs(q);
      const tickets: TicketData[] = [];
      querySnaps.forEach((snap) => {
        const data = snap.data();
        const ticket: TicketData = {
          id: data.id,
          reserved: data.reserved,
          payed: data.payed,
          clientName: data.clientName,
          clientPhone: data.clientPhone,
        };
        tickets.push(ticket);
      });
      return tickets;
    } catch (e) {
      console.error(e);
      if (e instanceof FirebaseError) {
        if (e.code === "permission-denied") {
          throw new RaffleError("unauthorized");
        }
      }
      throw e;
    }
  };

  static saveTicket = async (raffleId: string, ticket: TicketData): Promise<TicketData> => {
    try {
      // Validate if user is owner of this raffle
      const raffleRef = doc(db, RAFFLES, raffleId);
      const raffleSnap = await getDoc(raffleRef);
      if (raffleSnap.data().userId !== AuthService.currentUser()?.uid) {
        throw new RaffleError("unauthorized");
      }

      await updateDoc(doc(db, RAFFLES, raffleId, TICKETS, ticket.id), {
        reserved: ticket.reserved,
        payed: ticket.payed,
        clientName: ticket.clientName,
        clientPhone: ticket.clientPhone,
        updatedAt: serverTimestamp(),
      });

      return ticket;
    } catch (e) {
      console.error(e);
      if (e instanceof FirebaseError) {
        if (e.code === "permission-denied") {
          throw new RaffleError("unauthorized");
        }
      }
      throw e;
    }
  };
}
