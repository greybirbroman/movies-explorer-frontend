import React from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import NavTab from "../NavTab/NavTab";
import "./Header.css";

function Header({ loggedIn }) {
  return (
    <header className="header">
      <Logo />
      {loggedIn ? <Navigation /> : <NavTab />}
    </header>
  );
}
export default Header;
