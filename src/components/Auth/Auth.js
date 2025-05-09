import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth({ onCloseModal, setTitleModal }) {
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setTitleModal("Inicia sesion");
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    setTitleModal("Crear nuevo usuario");
    setShowLogin(false);
  };

  return showLogin ? (
    <LoginForm
      onCloseModal={onCloseModal}
      showRegisterForm={showRegisterForm}
    />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}
