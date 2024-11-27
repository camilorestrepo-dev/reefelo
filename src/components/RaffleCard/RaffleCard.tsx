import "./RaffleCard.scss";
import { RaffleData } from "../../models/raffle";
import classnames from "classnames";
import Icon from "../Icon/Icon";

type RaffleCardProps = RaffleData & {
  className?: string;
  onClick?: VoidFunction;
};

const RaffleCard: React.FC<RaffleCardProps> = ({
  className,
  description,
  name,
  ticketsNumber,
  price,
  prize,
  onClick,
}: RaffleCardProps) => {
  return (
    <div className={classnames("raffle-card-container", className)} onClick={onClick}>
      <div className="top-side">
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
      <div className="bottom-side">
        <div className="info-row">
          <Icon icon="ticket" size={20} />
          {ticketsNumber}
        </div>
        <div className="info-row">
          <Icon icon="price" size={20} />${price}
        </div>
        <div className="info-row">
          <Icon icon="prize" size={20} />
          <p>{prize}</p>
        </div>
      </div>
    </div>
  );
};

export default RaffleCard;
