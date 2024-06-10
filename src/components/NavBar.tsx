import React from "react";
import style from "../index.css";
import Button from "./Button";

function NavBar() {
  return (
    <>
      <header>
        <nav className="nav collapsible">
          <a className="nav__brand" href="/">
            <img src="src\assets\react.svg" alt="" />
          </a>
          <svg className="icon icon--white nav__toggler">
            <use xlinkHref="./assets/sprite.svg#menu"></use>
          </svg>
          <ul className="list nav__list collapsible__content">
            <li className="nav__item">
              <a href="/">Home</a>
            </li>
            <li className="nav__item">
              <a href="/project">Project</a>
            </li>
            <li className="nav__item">
              <Button></Button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
