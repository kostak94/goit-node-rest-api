import express from "express";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import { authSigninSchema, authSignupSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(authSignupSchema),
  authControllers.signup
);
authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(authSigninSchema),
  authControllers.signin
);

authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.post("/logout", authenticate, authControllers.logout);

export default authRouter;
