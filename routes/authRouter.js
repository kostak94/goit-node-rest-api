import express from "express";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import { authSigninSchema, authSignupSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(authSignupSchema),
  authControllers.signup
);

export default authRouter;
