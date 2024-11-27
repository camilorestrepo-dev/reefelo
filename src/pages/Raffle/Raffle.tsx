import "./Raffle.scss";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainContainer from "../../components/MainContainer/MainContainer";
import RaffleTickets from "../../components/RaffleTickets/RaffleTickets";
import { TicketData } from "../../models/ticket";
import { RaffleService } from "../../services/raffle/raffle-service";
import EmptyState from "../../components/EmptyState/EmptyState";
import Button from "../../components/Button/Button";
import { RaffleData } from "../../models/raffle";
import Icon from "../../components/Icon/Icon";
import Modal from "../../components/Modal/Modal";
import TicketForm from "../../components/TicketForm/TicketForm";

const Raffle: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>();
  const [raffle, setRaffle] = useState<RaffleData>();
  const [openTicketForm, setOpenTicketForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketData>();
  const { raffleId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const loadTickets = useCallback(() => {
    RaffleService.loadTickets(raffleId)
      .then(setTickets)
      .catch((error) => {
        console.error(error);
      });
  }, [raffleId, setTickets]);

  const loadRaffle = useCallback(() => {
    RaffleService.loadRaffle(raffleId)
      .then(setRaffle)
      .catch((error) => {
        console.error(error);
      });
  }, [raffleId, setRaffle]);

  useEffect(() => {
    loadRaffle();
    loadTickets();
  }, [loadRaffle, loadTickets]);

  const onTicketPressed = (id: string) => {
    const pressedTicket = tickets.find((ticket) => ticket.id === id);
    setSelectedTicket({ ...pressedTicket });
    setOpenTicketForm(true);
  };

  const closeTicketForm = () => {
    setOpenTicketForm(false);
  };

  const saveTicket = async (updatedTicket: TicketData) => {
    console.log(updatedTicket);
  };

  return (
    <MainContainer>
      <section className="raffle-info-section">
        <h2>{raffle?.name ?? ""}</h2>
        <p>{raffle?.description ?? ""}</p>
        <div className="info-row">
          <Icon icon="price" size={24} />${raffle?.price ?? ""}
        </div>
        <div className="info-row">
          <Icon icon="prize" size={24} />
          {raffle?.prize ?? ""}
        </div>
      </section>
      <section className="raffle-tickets">
        {tickets && tickets.length && (
          <RaffleTickets tickets={tickets} onTicketPressed={onTicketPressed} />
        )}
        {tickets && tickets.length == 0 && <EmptyState />}
      </section>
      <section className="raffle-bottom-section">
        <Button
          variant="outline"
          onClick={() => {
            navigate(-1);
          }}
        >
          {t("actions.back")}
        </Button>
      </section>
      <Modal isOpen={openTicketForm} onClose={closeTicketForm}>
        <TicketForm
          ticket={selectedTicket}
          onSaveTicket={saveTicket}
          onCloseForm={closeTicketForm}
        />
      </Modal>
    </MainContainer>
  );
};

export default Raffle;
