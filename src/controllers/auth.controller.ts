import Errors from "@/config/errors";
import { comparePasswords } from "@/lib/hash";
import ServerResponse from "@/models/response";
import authValidator from "@/validators/auth.validator";
import { createUser, getFullUserByEmail, isEmailTaken } from "@/services/user";

const register: typeof authValidator.register = async (req, res) => {
  const { email } = req.body;
  const emailTaken = await isEmailTaken(email);
  if (emailTaken) throw Errors.emailTaken;
  const user = await createUser(req.body);
  return ServerResponse.success(res, user);
};

const login: typeof authValidator.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getFullUserByEmail(email);
  if (!user) throw Errors.invalidCredentials;
  const isValidPassword = await comparePasswords(password, user.password);
  if (!isValidPassword) throw Errors.invalidCredentials;
  const userWithoutPassword = { ...user, password: undefined };
  return ServerResponse.success(res, userWithoutPassword);
};

export default {
  login,
  register,
};
