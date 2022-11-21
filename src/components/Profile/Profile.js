import React, { useState, useEffect } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import Header from "../Header/Header";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Profile({
  onLogout,
  onUpdateUser,
  loggedIn,
  isProfileUpdateSuccessful,
  profileUpdateMessage,
  profileErrorMessage,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isChanged, setIsChanged] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);
  const { values, isValid, errors, resetForm, handleChange, setValues } =
    useFormWithValidation();

  const disabledButton =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      onUpdateUser({
        name: values.name,
        email: values.email,
      });
    }
    setTimeout(() => {
      setInputDisabled((state) => !state);
      setIsChanged((state) => !state);
    }, 2000);
    resetForm();
  }

  function handleUpdateProfile() {
    setInputDisabled((state) => !state);
  }

  function handleSave() {
    setIsChanged((state) => !state);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <form className="profile__form" onSubmit={handleSubmit}>
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <fieldset className="profile__fields">
            <label className="profile__label">Имя</label>
            <input
              name="name"
              type="text"
              className={`profile__input ${errors.name &&'profile__input_error'}`}
              value={values?.name ?? currentUser.name}
              onChange={handleChange}
              required
              disabled={inputDisabled}
              minLength="2"
            ></input>
          <span
            className={`profile__info-message 
             ${!isValid ? `profile__info-message_error` : null}`}
          >
            {errors?.name}
          </span>
          </fieldset>

          <fieldset className="profile__fields">
            <label className="profile__label">E-mail</label>
            <input
              name="email"
              type="email"
              className={`profile__input ${errors.email && 'profile__input_error'}`}
              value={values?.email ?? currentUser.email}
              onChange={handleChange}
              required
              pattern="^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$"
              disabled={inputDisabled}
            ></input>
          <span
            className={`profile__info-message 
             ${!isValid ? `profile__info-message_error` : null}`}
          >
            {errors?.email}
          </span>
          </fieldset>

          <span
            className={`profile__info-message 
             ${
               isProfileUpdateSuccessful
                 ? `profile__info-message_active-success`
                 : `profile__info-message_error`
             }`}
          >
            {isProfileUpdateSuccessful
              ? `${profileUpdateMessage}`
              : `${profileErrorMessage}`}
          </span>

          <fieldset className="profile__buttons">
            {inputDisabled ? (
              <>
                <button
                  type="submit"
                  className="profile__btn profile__btn_type_black"
                  onClick={handleUpdateProfile}
                >
                  Редактировать
                </button>
                <button
                  className="profile__btn profile__btn_type_exit"
                  onClick={onLogout}
                >
                  Выйти из аккаунта
                </button>
              </>
            ) : (
              <button
                type="submit"
                className={
                  !disabledButton || isChanged
                    ? "profile__btn"
                    : "profile__btn_type_disabled"
                }
                onClick={handleSave}
                disabled={disabledButton}
              >
                Сохранить
              </button>
            )}
          </fieldset>
        </form>
      </section>
    </>
  );
}

export default Profile;
