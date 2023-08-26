export const ACTIONS = {
  EMAIL_INPUT: "email-input",
  EMAIL_BLUR: "email-blur",
  EMAIL_VALIDATE: "email-validate",
  PASSWORD_INPUT: "password-input",
  PASSWORD_BLUR: "password-blur",
  PASSWORD_VALIDATE: "password-validate",
};

export const INITIAL = {
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
};

export function formReducer(state, action) {
  switch (action.type) {
    case ACTIONS.EMAIL_INPUT: {
      const updated = { ...state };
      updated.fields.email.is_valid = action.value.includes("@");
      updated.fields.email.value = action.value;
      updated.is_form_valid =
        updated.fields.email.is_valid && updated.fields.password.is_valid;

      return updated;
    }
    case ACTIONS.EMAIL_BLUR: {
      const updated = { ...state };
      updated.fields.email.is_valid = updated.fields.email.value.includes("@");
      updated.is_form_valid =
        updated.fields.email.is_valid && updated.fields.password.is_valid;

      return updated;
    }
    case ACTIONS.PASSWORD_INPUT: {
      const updated = { ...state };
      updated.fields.password.is_valid = action.value.trim().length > 6;
      updated.fields.password.value = action.value;
      updated.is_form_valid =
        updated.fields.email.is_valid && updated.fields.password.is_valid;

      return updated;
    }
    case ACTIONS.PASSWORD_BLUR: {
      const updated = { ...state };
      updated.fields.password.is_valid =
        updated.fields.password.value.trim().length > 6;
      updated.is_form_valid =
        updated.fields.email.is_valid && updated.fields.password.is_valid;

      return updated;
    }
    case ACTIONS.PASSWORD_VALIDATE: {
        
    }
    default: {
      return state;
    }
  }
}
