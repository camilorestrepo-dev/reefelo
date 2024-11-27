import classnames from "classnames";
import "./Button.scss";

type ButtonProps = {
  label: string;
  variant: "solid" | "outline" | "link";
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, variant, onClick }: ButtonProps) => (
  <button className={classnames("custom-btn", `${variant}-btn`)} onClick={onClick}>
    {label}
  </button>
);

export default Button;
