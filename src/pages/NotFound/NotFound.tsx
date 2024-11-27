import "./NotFound.scss";
import MainContainer from "../../components/MainContainer/MainContainer";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <MainContainer>
      <section className="not-found">
        <div className="illustration">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="#FF5733"
              d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm0 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10z"
            />
            <path fill="#2C3E50" d="M12 13a5 5 0 0 0-5 5h2a3 3 0 0 1 6 0h2a5 5 0 0 0-5-5z" />
            <path
              fill="#2C3E50"
              d="M15.5 9A1.5 1.5 0 1 0 17 10.5 1.5 1.5 0 0 0 15.5 9zm-7 0A1.5 1.5 0 1 0 10 10.5 1.5 1.5 0 0 0 8.5 9z"
            />
          </svg>
        </div>
        <h1>404 - {t("notFound")}</h1>
        <p>{t("notFoundMessage")}</p>
        <NavLink to="/home" className="home-link">
          {t("goHome")}
        </NavLink>
      </section>
    </MainContainer>
  );
};

export default NotFound;
