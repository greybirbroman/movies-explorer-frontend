import React from "react";
import { NavLink } from "react-router-dom";
import "./PopupNavigation.css";

function PopupNavigation({ handleClose }) {
  return (
    <div className="popup">
      <div className="popup__container">
        <button className="popup__btn_close" onClick={handleClose}></button>

        <NavLink
          exact
          to="/"
          activeClassName="popup__link_active"
          className="popup__link popup__link_film"
        >
          Главная
        </NavLink>

        <NavLink
          to="/movies"
          activeClassName="popup__link_active"
          className="popup__link popup__link_film"
        >
          Фильмы
        </NavLink>

        <NavLink
          to="/saved-movies"
          activeClassName="popup__link_active"
          className="popup__link popup__link_film"
        >
          Сохранённые фильмы
        </NavLink>

        <NavLink
          to="/profile"
          activeClassName="popup__link_active"
          className="popup__link popup__link_profile"
        >
          Аккаунт
        </NavLink>
      </div>
    </div>
  );
}

export default PopupNavigation;
