import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";

import "./Header.scss";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <NavLink to="/home" className="navbar-logo">
          Reefelo
        </NavLink>
        <ul className="navbar-links">
          <li>
            <Button variant="outline" className="logout-btn" onClick={logout}>
              {t("signOut")}
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
