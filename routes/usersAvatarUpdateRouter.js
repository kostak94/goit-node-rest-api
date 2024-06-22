import express from "express";

import upload from "../middlewares/upload.js";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const usersAvatarUpdateRouter = express.Router();

usersAvatarUpdateRouter.use(authenticate);

usersAvatarUpdateRouter.patch(
  "/avatars",
  upload.single("avatarUrl"),
  authControllers.updateAvatar
);

export default usersAvatarUpdateRouter;
