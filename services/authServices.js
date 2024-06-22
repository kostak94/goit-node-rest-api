import User from "../model/User.js";

export const signup = (data) => User.create(data);

export const findUser = (filter) => User.findOne(filter);

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);
export const updateAvatar = (id, avatarUrl) =>
  User.findOneAndUpdate(id, { avatarUrl });
