import React, { useState } from "react";
import "./Login.css";
import Form from "../Form/Form";
import Logo from "../Logo/Logo";
import SubmitGroup from "../SubmitGroup/SubmitGroup";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useEffect } from "react";

function Login({ onLogin, resetMessage, message }) {
  const [errorMessage, setErrorMessage] = useState("");
  const { values, isValid, handleChange, errors, resetForm } =
    useFormWithValidation({
      email: "",
      password: "",
    });

  // Обнулить ошибку
  useEffect(() => {
    resetMessage();
  }, [values]);

  // Установить сообщение об ошибке
  useEffect(() => {
    setErrorMessage(message);
  }, [message]);

  const spanErrorClass = `login__error ${
    !isValid ? "login__error_active" : ""
  }`;

  const resetInputs = () => {
    resetForm({
      email: "",
      password: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      // Прокинуть данные из Инпутов для обращения к API
      onLogin({
        email: values.email,
        password: values.password,
        resetInputs,
      });
    }
  };

  return (
    <section className="login">
      <Logo />
      <Form title={"Рады видеть!"} onSubmit={handleSubmit}>
        <fieldset className="login__fields">
          <input
            type="email"
            className="login__input"
            name="email"
            required
            placeholder="E-mail"
            pattern="^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$"
            onChange={handleChange}
            value={values.email || ""}
          ></input>
          <span className={spanErrorClass}>{errors?.email}</span>
        </fieldset>

        <fieldset className="login__fields">
          <input
            type="password"
            className="login__input"
            name="password"
            minLength="8"
            required
            placeholder="Пароль"
            onChange={handleChange}
            value={values.password || ""}
          ></input>
          <span className={spanErrorClass}>{errors?.password}</span>
        </fieldset>

        <SubmitGroup
          submitName={"Войти"}
          linkName={"Регистрация"}
          linkDestination={"/signup"}
          submitDisabled={!isValid}
          errorMessage={errorMessage}
        >
          Еще не зарегестированы?&ensp;
        </SubmitGroup>
      </Form>
    </section>
  );
}
export default Login;
