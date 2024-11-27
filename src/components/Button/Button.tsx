import classnames from "classnames";
import "./Button.scss";

type ButtonProps = {
  label: string;
  type?: "button" | "reset" | "submit";
  variant: "solid" | "outline" | "link";
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, type, variant, onClick }: ButtonProps) => (
  <button
    type={type || "button"}
    className={classnames("custom-btn", `${variant}-btn`)}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Button;
