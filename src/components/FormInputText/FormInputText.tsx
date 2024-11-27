import "./FormInputText.scss";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import classnames from "classnames";

type FormInputTextProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  value?: string | number | readonly string[];
  disabled?: boolean;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const FormInputText: React.FC<FormInputTextProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  value = "",
  disabled = false,
  error,
  onChange,
}: FormInputTextProps) => {
  return (
    <label
      className={classnames("form-input", { "input-error": error, "input-disabled": disabled })}
    >
      <span>{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      {error && <span className="error-message">{error}</span>}
    </label>
  );
};

export default FormInputText;
