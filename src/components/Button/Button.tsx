import classnames from "classnames";
import "./Button.scss";

export type ButtonProps = {
  label: string;
  type?: "button" | "reset" | "submit";
  variant: "solid" | "outline" | "link";
  onClick?: VoidFunction;
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
