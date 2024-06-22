import express from "express";
import upload from "../middlewares/upload.js";
import authControllers from "../controllers/authControllers.js";

const usersAvatarUpdateRouter = express.Router();

usersAvatarUpdateRouter.patch(
  "avatars",
  upload.single("avatarUrl"),
  authControllers.updateAvatar
);

export default usersAvatarUpdateRouter;
