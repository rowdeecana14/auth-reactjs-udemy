import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

function Login(props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [emailIsValid, setEmailIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();

  useEffect(() => {
    const time = setTimeout(() => {
      validateEmail();
      validatePassword();
    }, 500);

    return () => {
      clearTimeout(time);
    };
  }, [form]);

  function onsubmitLogin(event) {
    event.preventDefault();
    props.login(form);
  }

  function onchangeInput(field, value) {
    setForm((preValues) => {
      return {
        ...preValues,
        [field]: value,
      };
    });
  }

  function validateEmail() {
    setEmailIsValid(form.email.includes("@"));
  };

  function validatePassword(){
    setPasswordIsValid(form.password.trim().length > 6);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={onsubmitLogin}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={((event) =>
              onchangeInput("email", event.target.value)
            )}
            onBlur={validateEmail}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={((event) =>
              onchangeInput("password", event.target.value)
            )}
            onBlur={validatePassword}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!passwordIsValid || !emailIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Login;
