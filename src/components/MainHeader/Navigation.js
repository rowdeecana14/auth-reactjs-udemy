import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import classes from "./Navigation.module.css";

function Navigation(props) {
  const context = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {context.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <button onClick={context.logout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
