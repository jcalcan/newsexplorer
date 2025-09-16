import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useRef } from "react";

import "./RegisterModal.css";

export default function RegisterModal({
  onClose,
  isOpen,
  handleRegistration,
  handleModalSwitch
}) {
  const emailInputRef = useRef(null);
  const [data, setData] = useState({
    email: "",
    password: "",
    username: ""
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    username: false
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validators = {
    email: (value) => value.includes("@") && value.includes("."),
    password: (value) => value.length >= 6,
    username: (value) => value.length > 3
  };

  const validateForm = (formData = data) => {
    const newErrors = {};
    if (!validators.email(formData.email)) newErrors.email = "Invalid email";
    if (!validators.password(formData.password))
      newErrors.password = "Password must be at least 6 characters";
    if (!validators.username(formData.username))
      newErrors.name = "Name must be at least 4 characters";

    setErrors(newErrors);
    setIsValid(
      Object.keys(newErrors).length === 0 &&
        Object.values(formData).every(Boolean)
    );
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    const newData = { ...data, [name]: value };
    setData(newData);
    setTouched((prev) => ({ ...prev, [name]: true }));
    setServerError("");
    validateForm(newData);
  };

  useEffect(() => {
    if (isOpen) {
      setData({ email: "", password: "", username: "" });
      setTouched({ email: false, password: false, username: false });
      setErrors({});
      setIsValid(false);
      setServerError("");
      emailInputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleRegistration(data).catch((error) => {
        setServerError(error);
        setIsValid(false);
      });
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign up"
      buttonWidthStyle={{ width: "360px" }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      alternativeAction={
        <button
          type="button"
          to="login"
          className="modal__alternateAction-link"
          onClick={handleModalSwitch}
        >
          <span className="modal__alternateAction-link-or-part">or</span> Sign
          In
        </button>
      }
      isValid={isValid}
    >
      <label htmlFor="signup-email-input" className="modal__label">
        Email
      </label>
      <input
        ref={emailInputRef}
        id="signup-email-input"
        type="email"
        className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
        name="email"
        placeholder="Email"
        required
        onInput={handleInput}
        value={data.email}
      />
      {touched.email && errors.email && (
        <span className="modal__error">{errors.email}</span>
      )}

      <label htmlFor="signup-password-input" className="modal__label">
        Password
      </label>
      <input
        id="signup-password-input"
        name="password"
        type="password"
        className={`modal__input ${
          errors.password ? "modal__input_error" : ""
        }`}
        placeholder="Password"
        value={data.password}
        required
        onInput={handleInput}
      />
      {touched.password && errors.password && (
        <span className="modal__error">{errors.password}</span>
      )}
      <label htmlFor="signup-username-input" className="modal__label">
        Username
      </label>
      <input
        id="signup-username-input"
        name="username"
        type="text"
        className={`modal__input ${
          errors.username ? "modal__input_error" : ""
        }`}
        placeholder="Username"
        required
        value={data.username}
        onInput={handleInput}
      />
      {touched.username && errors.username && (
        <span className="modal__error">{errors.username}</span>
      )}

      {serverError && (
        <span className="modal__error modal__error_server">{serverError}</span>
      )}
    </ModalWithForm>
  );
}
