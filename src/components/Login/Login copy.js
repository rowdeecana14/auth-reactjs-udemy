import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { act } from "react-dom/test-utils";

function emailReducer(state, action) {
  if (action.type == "USER_INPUT") {
    return {
      value: action.value,
      is_valid: action.value.includes("@"),
    };
  }

  if (action.type == "USER_BLUR") {
    return {
      value: state.value,
      is_valid: state.value.includes("@"),
    };
  }

  return {
    value: "",
    is_valid: false,
  };
}

function passwordReducer(state, action) {
  if (action.type == "USER_INPUT") {
    return {
      value: action.value,
      is_valid: action.value.trim().length > 6,
    };
  }

  if (action.type == "USER_BLUR") {
    return {
      value: state.value,
      is_valid: state.value.trim().length > 6,
    };
  }

  return {
    value: "",
    is_valid: false,
  };
}

function formReducer(state, action) {
  if(action.type === "EMAIL_INPUT") {
    return {
      is_form_valid: is_email_valid && is_password_valid,
      fields: {
        email: {
          value: action.value,
          is_valid: action.value.includes("@"),
        },
        password: state.fields.password
      }
    };
  }
  else if(action.type === "EMAIL_BLUR") {
    return {
      is_form_valid: is_email_valid && is_password_valid,
      fields: {
        email: {
          value: state.fields.email.value,
          is_valid: state.fields.email.value.includes("@"),
        },
        password: state.fields.password
      }
    };
  }
  else if(action.type === "PASSWORD_INPUT") {
    const is_password_valid = state.fields.password.value.trim().length > 6;
    const is_email_valid = state.fields.email.is_valid;

    return {
      is_form_valid: is_email_valid && is_password_valid,
      fields: {
        email: state.fields.email,
        password: {
          value: action.value,
          is_valid: action.value.trim().length > 6,
        }
      }
    };

  }
  else if(action.type === "PASSWORD_BLUR") {
    const is_password_valid = state.fields.password.value.trim().length > 6;
    const is_email_valid = state.fields.email.is_valid;

    return {
      is_form_valid: is_email_valid && is_password_valid,
      fields: {
        email: state.fields.email,
        password: {
          value: state.fields.password.value,
          is_valid: is_password_valid,
        }
      }
    };
  }
  else {
    return {
      is_form_valid: false,
      fields: {
        email: {
          value: "",
          is_valid: false
        },
        password: {
          value: "",
          is_valid: false
        }
      }
    };
  }
}

function Login(props) {
  const [email, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    is_valid: null,
  });

  const [password, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    is_valid: null,
  });

  function validateEmail(){
    dispatchEmail({ type: "USER_BLUR" });
  }

  function validatePassword(){
    dispatchPassword({ type: "USER_BLUR" });
  }


  // useEffect(() => {
  //   const time = setTimeout(() => {
  //     validateEmail();
  //     validatePassword();
  //   }, 500);

  //   return () => {
  //     clearTimeout(time);
  //   };
  // }, [form]);



  function onsubmitLogin(event) {
    event.preventDefault();
    props.login(email.value);
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={onsubmitLogin}>
        <div
          className={`${classes.control} ${
            email.is_valid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email.value}
            onChange={(event) =>
              dispatchEmail({ type: "USER_INPUT", value: event.target.value })
            }
            onBlur={validateEmail}
          />
        </div>
        <div
          className={`${classes.control} ${
            password.is_valid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password.value}
            onChange={(event) =>
              dispatchPassword({ type: "USER_INPUT", value: event.target.value })
            }
            onBlur={validatePassword}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!email.is_valid || !password.is_valid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Login;
