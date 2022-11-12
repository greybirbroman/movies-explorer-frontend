import "./Register.css";
import Form from "../Form/Form";
import SubmitGroup from "../SubmitGroup/SubmitGroup";
import Logo from "../Logo/Logo";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useState } from "react";
import { useEffect } from "react";

function Register({ onRegister, message, resetMessage }) {
  const [errorMessage, setErrorMessage] = useState("");
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({
      name: "",
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

  const spanErrorClass = `register__error ${
    !isValid ? "register__error_active" : ""
  }`;

  const resetInputs = () => {
    resetForm({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      // Прокинуть данные из Инпутов для обращения к API
      onRegister({
        name: values.name,
        email: values.email,
        password: values.password,
        resetInputs,
      });
    }
  };

  return (
    <>
      <section className="register">
        <Logo />
        <Form title={"Добро пожаловать!"} onSubmit={handleSubmit}>
          <fieldset className="register__fields">
            <input
              className="register__input"
              required
              placeholder="Имя"
              name="name"
              value={values.name || ""}
              onChange={handleChange}
              minLength="2"
            ></input>
            <span className={spanErrorClass}>{errors?.name}</span>
          </fieldset>

          <fieldset className="register__fields">
            <input
              type="email"
              placeholder="E-mail"
              className="register__input"
              required
              pattern="^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$"
              name="email"
              value={values.email || ""}
              onChange={handleChange}
            ></input>
            <span className={spanErrorClass}>{errors?.email}</span>
          </fieldset>

          <fieldset className="register__fields">
            <input
              type="password"
              placeholder="Пароль"
              className="register__input"
              required
              minLength="8"
              name="password"
              value={values.password || ""}
              onChange={handleChange}
            ></input>
            <span className={spanErrorClass}>{errors?.password}</span>
          </fieldset>
          <SubmitGroup
            submitName={"Зарегестрироваться"}
            linkName={"Войти"}
            linkDestination={"/signin"}
            submitDisabled={!isValid}
            errorMessage={errorMessage}
          >
            Уже зарегестрировались?&ensp;
          </SubmitGroup>
        </Form>
      </section>
    </>
  );
}

export default Register;
