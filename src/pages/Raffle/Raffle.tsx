import { useParams } from "react-router-dom";
import MainContainer from "../../components/MainContainer/MainContainer";
import RaffleTickets from "../../components/RaffleTickets/RaffleTickets";

const Raffle: React.FC = () => {
  const { raffleId } = useParams();

  const number = 100;
  const digits = Math.log10(number);
  const tickets = Array(number)
    .fill(null)
    .map((_, index) => ({
      id: String(index).padStart(digits, "0"),
      enabled: Math.random() > 0.5,
      payed: Math.random() > 0.5,
    }));
  const onTicketPressed = (id: string) => {
    console.log("ticket pressed", id);
  };

  console.log(tickets);
  console.log(raffleId);
  return (
    <MainContainer>
      <div style={{ padding: 20 }}>
        <h2>Raffle View</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      </div>
      <section className="raffle-tickets">
        <RaffleTickets tickets={tickets} onTicketPressed={onTicketPressed} />
      </section>
    </MainContainer>
  );
};

export default Raffle;
