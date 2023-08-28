import Limits from "./limits";

const Messages = {
  errors: {
    invalidCredentials: "Invalid email or password.",
    emailTaken: "Email is already taken.",
  },
  limits: {
    password: {
      min: `Password must be at least ${Limits.password.min} characters.`,
    },
  },
  required: {
    email: "Email is required.",
    password: "Password is required.",
  },
} as const;

export default Messages;
