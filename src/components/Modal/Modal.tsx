import { createPortal } from "react-dom";
import "./Modal.scss";

export interface ModalProps extends React.PropsWithChildren {
  isOpen: boolean;
  onClose: VoidFunction;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
