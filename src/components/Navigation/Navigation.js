import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PopupNavigation from "../PopupNavigation/PopupNavigation";
import "./Navigation.css";

function Navigation() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleClose = () => {
    setIsPopupVisible(false);
  };

  const handleClick = () => {
    setIsPopupVisible(true);
  };

  return (
    <nav className="menu">
      <div className="menu__container">
        <NavLink
          to="/movies"
          activeClassName="menu__link_active"
          className="menu__link menu__link_film"
        >
          Фильмы
        </NavLink>

        <NavLink
          to="/saved-movies"
          activeClassName="menu__link_active"
          className="menu__link menu__link_film"
        >
          Сохранённые фильмы
        </NavLink>
      </div>

      <NavLink
        to="/profile"
        activeClassName="menu__link_active"
        className="menu__link menu__link_profile"
      >
        Аккаунт
      </NavLink>
      <button className="menu__button" onClick={handleClick} />
      {isPopupVisible && <PopupNavigation handleClose={handleClose} />}
    </nav>
  );
}

export default Navigation;
