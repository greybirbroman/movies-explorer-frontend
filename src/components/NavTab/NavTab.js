import React from "react";
import { Link } from "react-router-dom";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className="nav-tab">
      <Link to="/signup" className="nav-tab__btn nav-tab__btn_register">
        Регистрация
      </Link>
      <Link to="/signin" className="nav-tab__btn nav-tab__btn_login">
        Войти
      </Link>
    </nav>
  );
}

export default NavTab;
