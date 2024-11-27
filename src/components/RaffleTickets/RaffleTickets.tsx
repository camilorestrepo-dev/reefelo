import "./RaffleTickets.scss";
import classnames from "classnames";
import { TicketData } from "../../models/ticket";

type OnTicketPressed = (id: string) => void;

type RaffleTicketsProps = {
  tickets: Array<TicketData>;
  onTicketPressed: OnTicketPressed;
};

const RaffleTickets: React.FC<RaffleTicketsProps> = ({
  tickets,
  onTicketPressed,
}: RaffleTicketsProps) => {
  return (
    <div className={classnames("raffle-tickets-container", { "small-view": tickets.length == 10 })}>
      {tickets.map((ticket) => {
        const { id, enabled, payed } = ticket;
        return (
          <label
            className={classnames("raffle-ticket-card", {
              "disabled-ticket": !enabled,
              "payed-ticket": !enabled && payed,
            })}
            key={id}
            data-testid={`ticket-btn-${id}`}
            onClick={() => onTicketPressed(id)}
          >
            {id}
          </label>
        );
      })}
    </div>
  );
};

export default RaffleTickets;
