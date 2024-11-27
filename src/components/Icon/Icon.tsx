import error from "../../assets/icons/error.svg";
import close from "../../assets/icons/close.svg";

const ICONS = {
  error,
  close,
};

interface IconProps {
  icon: "error" | "close";
  size?: number;
}

const Icon: React.FC<IconProps> = ({ icon, size = 24 }: IconProps) => {
  return <img src={ICONS[icon]} className={`icon-${icon}`} width={size} height={size} />;
};

export default Icon;
