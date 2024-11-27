import { useState } from "react";
import { useTranslation } from "react-i18next";
import MainContainer from "../../components/MainContainer/MainContainer";
import "./CreateRaffle.scss";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { RaffleData } from "../../models/raffle";
import FormInputText from "../../components/FormInputText/FormInputText";
// import { RaffleService } from "../../services/raffle/raffle-service";
import Loading from "../../components/Loading/Loading";

type RaffleFormErrors = {
  name?: string;
  description?: string;
  prize?: string;
  price?: string;
  ticketsNumber?: string;
};

const CreateRaffle: React.FC = () => {
  const [newRaffle, setNewRaffle] = useState<RaffleData>({
    name: "",
    description: "",
    prize: "",
    ticketsNumber: 100,
  });
  const [formValidation, setFormValidation] = useState<RaffleFormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onChangeData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.type === "number" ? e.target.valueAsNumber : e.target.value;
    setNewRaffle((oldValue) => ({
      ...oldValue,
      [e.target.name]: value,
    }));
    setFormValidation((oldValue) => ({
      ...oldValue,
      [e.target.name]: null,
    }));
  };

  // Returns true if the form data is valid, if there is not any error
  const validateForm = (): boolean => {
    const errors: RaffleFormErrors = {
      name: !newRaffle.name ? t("error.required") : "",
      description: !newRaffle.description ? t("error.required") : "",
      prize: !newRaffle.prize ? t("error.required") : "",
      price: !newRaffle.price ? t("error.required") : "",
      ticketsNumber: !newRaffle.ticketsNumber ? t("error.required") : "",
    };
    setFormValidation(errors);
    return Object.values(errors).reduce((isValid, error) => isValid && !error, true);
  };

  const saveRaffle: React.FormEventHandler = async (e) => {
    e.preventDefault();
    console.log("click");
    if (validateForm()) {
      try {
        setLoading(true);
        // await RaffleService.save(newRaffle);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setLoading(false);
        navigate("/");
      } catch (e) {
        console.error(e);
        // TODO
      }
    }
  };

  return (
    <MainContainer>
      <section className="create-raffle-container">
        <h2>{t("createRaffle")}</h2>
        <form onSubmit={saveRaffle}>
          <FormInputText
            label={t("name")}
            name="name"
            placeholder={t("nameHint")}
            defaultValue={newRaffle.name}
            error={formValidation.name}
            onChange={onChangeData}
          />
          <FormInputText
            label={t("prize")}
            name="prize"
            placeholder={t("prize")}
            defaultValue={newRaffle.prize}
            error={formValidation.prize}
            onChange={onChangeData}
          />
          <FormInputText
            label={t("description")}
            name="description"
            placeholder={t("descriptionHint")}
            defaultValue={newRaffle.description}
            error={formValidation.description}
            onChange={onChangeData}
          />
          <FormInputText
            label={t("price")}
            type="number"
            name="price"
            placeholder="$900"
            defaultValue={newRaffle.price}
            error={formValidation.price}
            onChange={onChangeData}
          />
          <FormInputText
            label={t("ticketsNumber")}
            type="number"
            name="ticketsNumber"
            placeholder={t("ticketsNumber")}
            defaultValue={newRaffle.ticketsNumber}
            error={formValidation.ticketsNumber}
            onChange={onChangeData}
          />
          <div className="buttons-section">
            <Button
              label={t("actions.cancel")}
              variant="outline"
              disabled={loading}
              onClick={() => {
                navigate("/");
              }}
            />
            <Button label={t("actions.save")} type="submit" variant="solid" disabled={loading} />
          </div>
        </form>
      </section>
      <Loading isOpen={loading} />
    </MainContainer>
  );
};

export default CreateRaffle;
