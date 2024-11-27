import "./Button.scss";
import { PropsWithChildren } from "react";
import classnames from "classnames";

export interface ButtonProps extends PropsWithChildren {
  className?: string;
  type?: "button" | "reset" | "submit";
  variant: "solid" | "outline" | "link";
  disabled?: boolean;
  onClick?: VoidFunction;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  type,
  variant,
  disabled,
  onClick,
}: ButtonProps) => (
  <button
    type={type || "button"}
    className={classnames("custom-btn", `${variant}-btn`, { "disabled-btn": disabled }, className)}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
