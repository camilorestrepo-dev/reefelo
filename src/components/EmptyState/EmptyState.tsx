import "./EmptyState.scss";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import emptyImage from "../../assets/images/empty.svg";

type EmptyStateProps = {
  buttonText?: string;
  onRetry?: VoidFunction;
};

const EmptyState: React.FC<EmptyStateProps> = ({ buttonText, onRetry }: EmptyStateProps) => {
  const { t } = useTranslation();
  return (
    <div className="empty-state-container">
      <img src={emptyImage} className="empty-state-image" />
      <h2>{t("emptyState.title")}</h2>
      <p>{t("emptyState.subtitle")}</p>
      <Button variant="outline" className="retry" onClick={onRetry}>
        {buttonText || t("tryAgain")}
      </Button>
    </div>
  );
};

export default EmptyState;
