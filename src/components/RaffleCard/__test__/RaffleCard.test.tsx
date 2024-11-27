import { render } from "@testing-library/react";
import { RaffleData } from "../../../models/raffle";
import RaffleCard from "../RaffleCard";

const raffle: RaffleData = {
  name: "Rifa 2Motos",
  description: "Juega 25/07/25, Lote Caldas",
  price: 500,
  prize: "1000",
  ticketsNumber: 100,
};

test("reder corectly", () => {
  const component = render(<RaffleCard {...raffle} />);
  expect(component.container).toMatchSnapshot();
});
