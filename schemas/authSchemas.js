import Joi from "joi";
import { emailRegexp } from "../constants/userConstants.js";

export const authSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.alternatives().try(
    Joi.string().valid("starter"),
    Joi.string().valid("pro"),
    Joi.string().valid("business")
  ),
});

export const authSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
