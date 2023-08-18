import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const ACTIONS = {
  EMAIL_INPUT: "email-input",
  EMAIL_BLUR: "email-blur",
  PASSWORD_INPUT: "password-input",
  PASSWORD_BLUR: "password-blur",
};

function formReducer(state, action) {
  switch (action.type) {
    case ACTIONS.EMAIL_INPUT: {
      const updated = { ...state };
      updated.fields.email.is_valid = action.value.includes("@");
      updated.fields.email.value = action.value;
      updated.is_form_valid = updated.fields.email.is_valid  && updated.fields.password.is_valid ;

      return updated;
    }
    case ACTIONS.EMAIL_BLUR: {
      const updated = { ...state };
      updated.fields.email.is_valid = updated.fields.email.value.includes("@");
      updated.is_form_valid = updated.fields.email.is_valid  && updated.fields.password.is_valid;

      return updated;
    }
    case ACTIONS.PASSWORD_INPUT: {
      const updated = { ...state };
      updated.fields.password.is_valid = action.value.trim().length > 6;
      updated.fields.password.value = action.value;
      updated.is_form_valid = updated.fields.email.is_valid  && updated.fields.password.is_valid ;

      return updated;
    }
    case ACTIONS.PASSWORD_BLUR: {
      const updated = { ...state };
      updated.fields.password.is_valid = updated.fields.password.value.trim().length > 6;
      updated.is_form_valid = updated.fields.email.is_valid  && updated.fields.password.is_valid ;

      return updated;
    }
    default:{
      return state;
    }
  }
}

function Login(props) {
  const [form, dispatchForm] = useReducer(formReducer, {
    is_form_valid: false,
    fields: {
      email: {
        value: "",
        is_valid: null,
      },
      password: {
        value: "",
        is_valid: null,
      },
    },
  });

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
    props.login(form.fields.email.value, form.fields.password.value);
  }

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
