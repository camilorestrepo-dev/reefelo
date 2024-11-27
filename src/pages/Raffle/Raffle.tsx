import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainContainer from "../../components/MainContainer/MainContainer";
import RaffleTickets from "../../components/RaffleTickets/RaffleTickets";
import { TicketData } from "../../models/ticket";
import { RaffleService } from "../../services/raffle/raffle-service";
import EmptyState from "../../components/EmptyState/EmptyState";

const Raffle: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>();
  const { raffleId } = useParams();

  useEffect(() => {
    RaffleService.loadTickets(raffleId)
      .then(setTickets)
      .catch((error) => {
        console.error(error);
      });
  }, [raffleId]);

  const onTicketPressed = (id: string) => {
    console.log("ticket pressed", id);
  };

  return (
    <MainContainer>
      <div style={{ padding: 20 }}>
        <h2>Raffle View</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      </div>
      <section className="raffle-tickets">
        {tickets && tickets.length && (
          <RaffleTickets tickets={tickets} onTicketPressed={onTicketPressed} />
        )}
        {tickets && tickets.length == 0 && <EmptyState />}
      </section>
    </MainContainer>
  );
};

export default Raffle;
