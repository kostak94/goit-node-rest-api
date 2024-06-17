import bcrypt from "bcrypt";

import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email is already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await authServices.signup({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

export default {
  signup: ctrlWrapper(signup),
};
