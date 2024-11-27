import { useState } from "react";
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
        <h2>Create Raffle</h2>
        <form onSubmit={saveRaffle}>
          <label>
            <span>Name</span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              defaultValue={newRaffle.name}
              onChange={onChangeData}
            />
          </label>
          <label>
            <span>Prize</span>
            <input
              type="text"
              name="prizze"
              placeholder="Prize"
              defaultValue={newRaffle.prize}
              onChange={onChangeData}
            />
          </label>
          <label>
            <span>Description</span>
            <input
              type="text"
              name="description"
              placeholder="Description"
              defaultValue={newRaffle.description}
              onChange={onChangeData}
            />
          </label>
          <label>
            <span>Price</span>
            <input
              type="number"
              name="price"
              placeholder="$900"
              defaultValue={newRaffle.price}
              onChange={onChangeData}
            />
          </label>
          <label>
            <span>Tickets</span>
            <input
              type="number"
              name="tickets"
              placeholder="Thiceks"
              defaultValue={newRaffle.ticketsNumber}
              onChange={onChangeData}
            />
          </label>
          <div className="buttons-section">
            <Button
              label="Cancel"
              variant="outline"
              onClick={() => {
                navigate("/");
              }}
            />
            <Button label="Save" type="submit" variant="solid" />
          </div>
        </form>
      </section>
    </MainContainer>
  );
};

export default CreateRaffle;
