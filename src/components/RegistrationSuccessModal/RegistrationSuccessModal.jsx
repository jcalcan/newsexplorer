import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./RegistrationSuccessModal.css";

export default function RegistrationSuccessModal({
  onClose,
  isOpen,
  handleLoginClick,
}) {
  const [isValid, setIsValid] = useState(false);

  return (
    <ModalWithForm
      title="Registration successfully completed!"
      isOpen={isOpen}
      onClose={onClose}
      // onSubmit={handleSubmit}
      submitButton={false}
      alternativeAction={
        <button
          type="button"
          to="signin"
          className="success-modal__alternateAction-link"
          onClick={handleLoginClick}
        >
          <span className="modal__alternateAction-link-or-part"></span> Sign In
        </button>
      }
      isValid={isValid}
    ></ModalWithForm>
  );
}
