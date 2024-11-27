import { Dispatch, SetStateAction } from "react";

export function useInputChangeHandler<T, E>(
  setFromData: Dispatch<SetStateAction<T>>,
  resetFormValidation?: Dispatch<SetStateAction<E>>,
) {
  const onChangeData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let value: number | boolean | string;
    switch (e.target.type) {
      case "number":
        value = e.target.valueAsNumber;
        break;
      case "checkbox":
        value = e.target.checked;
        break;
      default:
        value = e.target.value;
        break;
    }
    setFromData((oldValue) => ({
      ...oldValue,
      [e.target.name]: value,
    }));
    resetFormValidation?.((oldValue) => ({
      ...oldValue,
      [e.target.name]: null,
    }));
  };

  return onChangeData;
}
