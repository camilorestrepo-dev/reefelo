import "./TicketForm.scss";
import { useTranslation } from "react-i18next";
import FormInputText from "../FormInputText/FormInputText";
import Button from "../Button/Button";
import { TicketData } from "../../models/ticket";
import { useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import { useInputChangeHandler } from "../../hooks/useInputChangeHandler";

type TicketFormProps = {
  ticket: TicketData;
  onSaveTicket: (updatedTicket: TicketData) => void;
  onCloseForm: VoidFunction;
};

const TicketForm: React.FC<TicketFormProps> = ({
  ticket,
  onSaveTicket,
  onCloseForm,
}: TicketFormProps) => {
  const [selectedTicket, setSelectedTicket] = useState<TicketData>({ ...ticket });
  const [formValidation, setFormValidation] = useState({
    clientName: "",
    clientPhone: "",
  });
  const { t } = useTranslation();
  const onChangeData = useInputChangeHandler(setSelectedTicket, setFormValidation);

  // Returns true if the form data is valid, if there is not any error
  const validateForm = (): boolean => {
    const errors = {
      clientName: selectedTicket.reserved && !selectedTicket.clientName ? t("error.required") : "",
      clientPhone:
        selectedTicket.reserved && !selectedTicket.clientPhone ? t("error.required") : "",
    };
    setFormValidation(errors);
    return Object.values(errors).reduce((isValid, error) => isValid && !error, true);
  };

  const saveTicket: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newTicket = { ...selectedTicket };
      if (!selectedTicket.reserved) {
        newTicket.clientName = "";
        newTicket.clientPhone = "";
        newTicket.payed = false;

        setSelectedTicket(newTicket);
      }
      onSaveTicket(newTicket);
    }
  };

  return (
    <section className="update-ticket-section">
      <h2>{t("editTicket")}</h2>
      <form onSubmit={saveTicket}>
        <Checkbox
          label={t("reservedTicket")}
          name="reserved"
          value={selectedTicket.reserved}
          onChange={onChangeData}
        />
        <FormInputText
          label={t("clientName")}
          name="clientName"
          placeholder={t("clientNameHint")}
          value={selectedTicket.clientName}
          error={formValidation.clientName}
          disabled={!selectedTicket.reserved}
          onChange={onChangeData}
        />
        <FormInputText
          label={t("clientPhone")}
          type="tel"
          name="clientPhone"
          placeholder="3105554433"
          value={selectedTicket.clientPhone}
          error={formValidation.clientPhone}
          disabled={!selectedTicket.reserved}
          onChange={onChangeData}
        />
        <Checkbox
          label={t("payed")}
          name="payed"
          value={selectedTicket.payed}
          disabled={!selectedTicket.reserved}
          onChange={onChangeData}
        />
        <div className="buttons-section">
          <Button
            variant="outline"
            // disabled={loading}
            onClick={onCloseForm}
          >
            {t("actions.cancel")}
          </Button>
          <Button type="submit" variant="solid" /* disabled={loading} */>
            {t("actions.save")}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default TicketForm;
