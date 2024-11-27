import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Raffle from "../pages/Raffle/Raffle";
import CreateRaffle from "../pages/CreateRaffle/CreateRaffle";
import NotFound from "../pages/NotFound/NotFound";
import SignIn from "../pages/Auth/SignIn";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/raffle/:raffleId" element={<Raffle />} />
          <Route path="/raffle/create" element={<CreateRaffle />} />
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
