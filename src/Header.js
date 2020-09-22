import React from "react";
import logo from "./imgs/headerlogo.svg";

class Header extends React.PureComponent {
  render() {
    return (
      <header className="header no-print">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="title">
          <span className="subtitle">customisable</span>
          habit tracker
        </h1>
      </header>
    );
  }
}

export default Header;
