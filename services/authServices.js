import User from "../model/User.js";

export const signup = (data) => User.create(data);

export const findUser = (filter) => User.findOne(filter);
