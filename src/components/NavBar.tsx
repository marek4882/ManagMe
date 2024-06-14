import { Link } from "react-router-dom";
import Button from "./Button";

function NavBar() {
  return (
    <header>
      <nav className="nav collapsible">
        <Link className="nav__brand" to="/">
          <img src="src/assets/react.svg" alt="React Logo" />
        </Link>
        <svg className="icon icon--white nav__toggler">
          <use xlinkHref="./assets/sprite.svg#menu"></use>
        </svg>
        <ul className="list nav__list collapsible__content">
          <li className="nav__item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav__item">
            <Link to="/project">Project</Link>
          </li>
          <li className="nav__item">
            <Button></Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
