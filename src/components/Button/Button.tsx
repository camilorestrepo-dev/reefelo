import classnames from "classnames";
import "./Button.scss";

export type ButtonProps = {
  label: string;
  type?: "button" | "reset" | "submit";
  variant: "solid" | "outline" | "link";
  disabled?: boolean;
  onClick?: VoidFunction;
};

const Button: React.FC<ButtonProps> = ({
  label,
  type,
  variant,
  disabled,
  onClick,
}: ButtonProps) => (
  <button
    type={type || "button"}
    className={classnames("custom-btn", `${variant}-btn`)}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
