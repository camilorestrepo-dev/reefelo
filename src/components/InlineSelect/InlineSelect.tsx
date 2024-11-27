import "./InlineSelect.scss";
import { useState } from "react";
import classnames from "classnames";
import Button from "../Button/Button";

type InlineOption = {
  label: string;
  value: number | string;
};

type InlineSelectProps = {
  className?: string;
  value?: number | string;
  label?: string;
  options: InlineOption[];
  onChange?: (newOptionValue: number | string) => void;
};

const InlineSelect: React.FC<InlineSelectProps> = ({
  className,
  value,
  label,
  options,
  onChange,
}: InlineSelectProps) => {
  const [selectedOption, setSelecterOption] = useState(value);

  const changeOption = (option: InlineOption) => {
    const value = option.value;
    setSelecterOption(value);
    onChange(value);
  };

  return (
    <div className={classnames("inline-select-container", className)}>
      {label && <label>{label}</label>}
      <div className="options-container">
        {options.map((option) => (
          <Button
            variant="outline"
            key={`option-${option.value}`}
            className={classnames({ selected: selectedOption === option.value })}
            onClick={() => changeOption(option)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default InlineSelect;
