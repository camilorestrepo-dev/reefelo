import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import "./FormInputText.scss";

type FormInputTextProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  defaultValue: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const FormInputText: React.FC<FormInputTextProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  defaultValue,
  onChange,
}: FormInputTextProps) => {
  return (
    <label className="form-input">
      <span>{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </label>
  );
};

export default FormInputText;
