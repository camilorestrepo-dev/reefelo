import "./Home.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";
import MainContainer from "../../components/MainContainer/MainContainer";
import { RaffleService } from "../../services/raffle/raffle-service";
import { RaffleData } from "../../models/raffle";
import RaffleCard from "../../components/RaffleCard/RaffleCard";
import EmptyState from "../../components/EmptyState/EmptyState";

const Home: React.FC = () => {
  const [raffles, setRaffles] = useState<RaffleData[]>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    RaffleService.loadRaffles(10)
      .then(setRaffles)
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigateToNewRaffle = () => {
    navigate("/raffle/create");
  };
  const navigateToRaffle = (raffle: RaffleData) => {
    navigate(`/raffle/${raffle.id}`);
  };

  return (
    <MainContainer>
      <section className="top-section">
        <h2>{t("raffles")}</h2>
        <Button variant="solid" onClick={navigateToNewRaffle}>
          {t("createRaffle")}
        </Button>
      </section>
      <section className="raffles-list-section">
        {raffles && raffles.length && (
          <div className="raffle-grid">
            {raffles.map((raffle) => (
              <RaffleCard key={raffle.id} {...raffle} onClick={() => navigateToRaffle(raffle)} />
            ))}
          </div>
        )}
        {raffles && raffles.length == 0 && <EmptyState />}
      </section>
    </MainContainer>
  );
};

export default Home;
