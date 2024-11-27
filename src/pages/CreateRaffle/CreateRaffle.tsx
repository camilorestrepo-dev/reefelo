import "./CreateRaffle.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MainContainer from "../../components/MainContainer/MainContainer";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { PowerOfTen, RaffleData } from "../../models/raffle";
import FormInputText from "../../components/FormInputText/FormInputText";
import { RaffleService } from "../../services/raffle/raffle-service";
import Loading from "../../components/Loading/Loading";
import ErrorModal from "../../components/Modal/ErrorModal";
import InlineSelect from "../../components/InlineSelect/InlineSelect";
import { useInputChangeHandler } from "../../hooks/useInputChangeHandler";
import { RaffleError } from "../../services/raffle-error";

type RaffleFormErrors = {
  name?: string;
  description?: string;
  prize?: string;
  price?: string;
  ticketsNumber?: string;
};

type RaffleDataForm = Omit<RaffleData, "userId">;

const CreateRaffle: React.FC = () => {
  const [newRaffle, setNewRaffle] = useState<RaffleDataForm>({
    name: "",
    description: "",
    prize: "",
    ticketsNumber: 100,
  });
  const [formValidation, setFormValidation] = useState<RaffleFormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { t } = useTranslation();

  const onChangeData = useInputChangeHandler(setNewRaffle, setFormValidation);

  const onChangeTicketsNumber = (ticketsNumber: PowerOfTen) => {
    setNewRaffle((oldValue) => ({
      ...oldValue,
      ticketsNumber,
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
    if (validateForm()) {
      setLoading(true);
      try {
        await RaffleService.saveRaffle({ ...newRaffle });
        navigate("/home");
      } catch (e) {
        if (e instanceof RaffleError) {
          setError(`error.${e.message}`);
          return;
        }
        console.error(e);
        setError("error.generic");
      } finally {
        setLoading(false);
      }
    }
  };

  const closeErrorModal = () => {
    setError("");
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
            value={newRaffle.name}
            error={formValidation.name}
            onChange={onChangeData}
          />
          <FormInputText
            label={t("prize")}
            name="prize"
            placeholder={t("prize")}
            value={newRaffle.prize}
            error={formValidation.prize}
            onChange={onChangeData}
          />
          <FormInputText
            label={t("description")}
            name="description"
            placeholder={t("descriptionHint")}
            value={newRaffle.description}
            error={formValidation.description}
            onChange={onChangeData}
          />
          <FormInputText
            label={t("price")}
            type="number"
            name="price"
            placeholder="$900"
            value={newRaffle.price}
            error={formValidation.price}
            onChange={onChangeData}
          />
          <InlineSelect
            label={t("ticketsNumber")}
            value={newRaffle.ticketsNumber}
            options={[
              { label: "10", value: 10 },
              { label: "100", value: 100 },
              { label: "1000", value: 1000 },
            ]}
            onChange={onChangeTicketsNumber}
          />
          <div className="buttons-section">
            <Button
              variant="outline"
              disabled={loading}
              onClick={() => {
                navigate(-1);
              }}
            >
              {t("actions.cancel")}
            </Button>
            <Button type="submit" variant="solid" disabled={loading}>
              {t("actions.save")}
            </Button>
          </div>
        </form>
      </section>
      <Loading isOpen={loading} />
      <ErrorModal errorMessage={t(error)} isOpen={!!error} onClose={closeErrorModal}></ErrorModal>
    </MainContainer>
  );
};

export default CreateRaffle;
