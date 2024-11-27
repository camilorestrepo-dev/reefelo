import { render, screen, fireEvent } from "@testing-library/react";
import RaffleTickets from "../RaffleTickets";
import props from "./porps.json";

test("render correctly", () => {
  const mockFn = () => {};
  const component = render(<RaffleTickets tickets={props} onTicketPressed={mockFn} />);
  expect(component.container).toMatchSnapshot();
});

test("click in the right ticket", async () => {
  let pressedTicket: string;
  const onPressed = (id: string) => {
    pressedTicket = id;
  };
  render(<RaffleTickets tickets={props} onTicketPressed={onPressed} />);

  const firstTicket = screen.getByTestId("ticket-btn-00");
  expect(firstTicket).toBeInTheDocument();

  fireEvent.click(firstTicket);
  expect(pressedTicket).toBe("00");
});
