import close from "../../assets/icons/close.svg";
import error from "../../assets/icons/error.svg";
import price from "../../assets/icons/price.svg";
import prize from "../../assets/icons/prize.svg";
import ticket from "../../assets/icons/ticket.svg";

const ICONS = {
  close,
  error,
  price,
  prize,
  ticket,
};

interface IconProps {
  icon: "close" | "error" | "price" | "prize" | "ticket";
  size?: number;
}

const Icon: React.FC<IconProps> = ({ icon, size = 24 }: IconProps) => {
  return <img src={ICONS[icon]} className={`icon-${icon}`} width={size} height={size} />;
};

export default Icon;
