import Icon from "../Icon/Icon";
import Modal, { ModalProps } from "./Modal";
import Button from "../Button/Button";
import "./ErrorModal.scss";

interface ErrorModalProps extends Pick<ModalProps, "isOpen" | "onClose"> {
  errorMessage: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  errorMessage,
  isOpen,
  onClose,
}: ErrorModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="error-modal-container">
        <Icon icon="error" size={60} />
        <Button variant="link" className="close-btn" onClick={onClose}>
          <Icon icon="close" />
        </Button>
        <p>{errorMessage}</p>
      </section>
    </Modal>
  );
};

export default ErrorModal;
