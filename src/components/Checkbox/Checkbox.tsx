import "./Checkbox.scss";
import { ChangeEventHandler } from "react";
import classnames from "classnames";

type FormInputTextProps = {
  label: string;
  name: string;
  value: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox: React.FC<FormInputTextProps> = ({
  label,
  name,
  value,
  disabled = false,
  error,
  onChange,
}: FormInputTextProps) => {
  return (
    <label
      className={classnames("form-input-checkbox", {
        "input-error": error,
        "input-disabled": disabled,
      })}
    >
      <div>
        <input
          type="checkbox"
          name={name}
          checked={value}
          disabled={disabled}
          onChange={onChange}
        />
        <span>{label}</span>
      </div>
      {error && <span className="error-message">{error}</span>}
    </label>
  );
};

export default Checkbox;
