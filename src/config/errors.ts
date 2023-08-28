import Exception from "@/models/error";
import Messages from "./messages";

const Errors = {
  invalidCredentials: Exception.manual(Messages.errors.invalidCredentials, 400),
  emailTaken: Exception.manual(Messages.errors.emailTaken, 400),
} as const;

export default Errors;
