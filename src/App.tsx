import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Raffle from "./pages/Raffle/Raffle";
import CreateRaffle from "./pages/CreateRaffle/CreateRaffle";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/Auth/SignIn";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/raffle/:raffleId" element={<Raffle />} />
        <Route path="/raffle/create" element={<CreateRaffle />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
