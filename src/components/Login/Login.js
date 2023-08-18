import { useReducer, useContext, useEffect } from "react";

import AuthContext from "../../store/AuthContext";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { INITIAL, ACTIONS, formReducer } from "../../reducers/LoginReducer";

function Login(props) {
  const context = useContext(AuthContext);
  const [form, dispatchForm] = useReducer(formReducer, INITIAL);

  function onsubmitLogin(event) {
    event.preventDefault();
    context.login(form.fields.email.value, form.fields.password.value);
  }

  // apply useEffect for debounce validations
  // email and password

  return (
    <Card className={classes.login}>
      <form onSubmit={onsubmitLogin}>
        <div
          className={`${classes.control} ${
            form.fields.email.is_valid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={form.fields.email.value}
            onChange={(event) =>
              dispatchForm({
                type: ACTIONS.EMAIL_INPUT,
                value: event.target.value,
              })
            }
            onBlur={() => dispatchForm({ type: ACTIONS.EMAIL_BLUR })}
          />
        </div>
        <div
          className={`${classes.control} ${
            form.fields.password.is_valid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={form.fields.password.value}
            onChange={(event) =>
              dispatchForm({
                type: ACTIONS.PASSWORD_INPUT,
                value: event.target.value,
              })
            }
            onBlur={() => dispatchForm({ type: ACTIONS.PASSWORD_BLUR })}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!form.is_form_valid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Login;
