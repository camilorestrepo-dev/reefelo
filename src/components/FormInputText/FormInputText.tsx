import "./FormInputText.scss";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import classnames from "classnames";

type FormInputTextProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  defaultValue: string | number | readonly string[];
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const FormInputText: React.FC<FormInputTextProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  defaultValue,
  error,
  onChange,
}: FormInputTextProps) => {
  return (
    <label className={classnames("form-input", { "input-error": error })}>
      <span>{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      {error && <span className="error-message">{error}</span>}
    </label>
  );
};

export default FormInputText;
