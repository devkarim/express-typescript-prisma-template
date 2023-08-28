import express from "express";

import authValidator from "@/validators/auth.validator";
import authController from "@/controllers/auth.controller";

const authRouter = express.Router();

// @route     POST /auth/login
// @desc      Log into user's account
// @access    Public
authRouter.post("/login", authValidator.login, authController.login);

// @route     POST /auth/register
// @desc      Create a new account
// @access    Public
authRouter.post("/register", authValidator.register, authController.register);

export default authRouter;
