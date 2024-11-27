import { useState } from "react";
import { useTranslation } from "react-i18next";
import MainContainer from "../../components/MainContainer/MainContainer";
import "./CreateRaffle.scss";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { RaffleData } from "../../models/raffle";

const CreateRaffle: React.FC = () => {
  const [newRaffle, setNewRaffle] = useState<RaffleData>({
    name: "",
    description: "",
    prize: "",
    ticketsNumber: 10,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onChangeData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewRaffle((oldValue) => ({
      ...oldValue,
      [e.target.name]: e.target.value,
    }));
  };

  const saveRaffle: React.FormEventHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <MainContainer>
      <section className="create-raffle-container">
        <h2>{t("createRaffle")}</h2>
        <form onSubmit={saveRaffle}>
          <label>
            <span>{t("name")}</span>
            <input
              type="text"
              name="name"
              placeholder={t("name")}
              defaultValue={newRaffle.name}
              onChange={onChangeData}
            />
          </label>
          <label>
            <span>{t("prize")}</span>
            <input
              type="text"
              name="prize"
              placeholder={t("prize")}
              defaultValue={newRaffle.prize}
              onChange={onChangeData}
            />
          </label>
          <label>
            <span>{t("description")}</span>
            <input
              type="text"
              name="description"
              placeholder={t("description")}
              defaultValue={newRaffle.description}
              onChange={onChangeData}
            />
          </label>
          <label>
            <span>{t("price")}</span>
            <input
              type="number"
              name="price"
              placeholder="$900"
              defaultValue={newRaffle.price}
              onChange={onChangeData}
            />
          </label>
          <label>
            <span>{t("ticketsNumber")}</span>
            <input
              type="number"
              name="tickets"
              placeholder={t("ticketsNumber")}
              defaultValue={newRaffle.ticketsNumber}
              onChange={onChangeData}
            />
          </label>
          <div className="buttons-section">
            <Button
              label={t("actions.cancel")}
              variant="outline"
              onClick={() => {
                navigate("/");
              }}
            />
            <Button label={t("actions.save")} type="submit" variant="solid" />
          </div>
        </form>
      </section>
    </MainContainer>
  );
};

export default CreateRaffle;
