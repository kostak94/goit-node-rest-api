import bcrypt from "bcrypt";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";

import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { createToken } from "../helpers/jwt.js";
import sendEmail from "../helpers/sendEmail.js";

const avatarDir = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email is already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarUrl = gravatar.url(email);
  const newUser = await authServices.signup({
    ...req.body,
    password: hashPassword,
    avatarUrl,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password invalid");
  }
  const { _id: id } = user;
  const payload = {
    id,
  };
  const token = createToken(payload);
  await authServices.updateUser({ _id: id }, { token });
  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription, avatarUrl } = req.user;

  res.json({
    email,
    subscription,
    avatarUrl,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: null });
  res.json({
    message: "Logout success",
  });
};

const verify = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await authServices.findUser({ verificationCode });
  if (!user) {
    throw HttpError(404, "Email not found or already verify");
  }

  await authServices.updateUser(
    { _id: user._id },
    { verify: true, verificationCode: "" }
  );

  res.json({
    message: "Email verify success",
  });
};

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(404, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Email already verified");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send success",
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.body;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarDir, filename);

  Jimp.read(oldPath, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).write(newPath);
  });
  await fs.rename(oldPath, newPath);

  const avatarUrl = path.join("avatars", filename);
  await authServices.updateAvatar(_id, avatarUrl);
  res.json({ avatarUrl });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  verify: ctrlWrapper(verify),
  resendEmail: ctrlWrapper(resendEmail),
};
