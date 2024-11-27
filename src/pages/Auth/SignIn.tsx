import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";
import MainContainer from "../../components/MainContainer/MainContainer";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";
import ErrorModal from "../../components/Modal/ErrorModal";

import "./SignIn.scss";

const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const { signInLoading: loading, signInError, clearSignInError, login } = useAuth();

  const closeErrorModal = () => {
    clearSignInError();
  };

  return (
    <MainContainer>
      <section className="sign-in-container">
        <h1>{t("manageTitle")}</h1>
        <h2>{t("signIn")}</h2>
        <Button variant="solid" onClick={login}>
          {t("continueWithGoogle")}
        </Button>
      </section>
      <Loading isOpen={loading} />
      <ErrorModal
        errorMessage={t(signInError)}
        isOpen={!!signInError}
        onClose={closeErrorModal}
      ></ErrorModal>
    </MainContainer>
  );
};

export default SignIn;
