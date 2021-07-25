require("dotenv").config();
import { hashSync, genSaltSync, compareSync } from "bcrypt";
// @ts-ignore
import { User } from "../models";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { user } from "../types";
import {
  getUserByUserName,
  getUserByEmail,
  getAllUsers,
  getAllEmployeesWithoutTeam,
  updateTeam,
  updateAdmin,
  getEmployeesByTeamId,
  updateEmailOrPassword,
  changeTeamIdQuery,
} from "../DBQueries/userQueries";
const accessSecretKey: any = process.env.ACCESS_SECRET_KEY;
const refreshSecretKey: any = process.env.REFRESH_SECRET_KEY;

import { UsersLogs } from "../classes/Logger";
export const usersLogs = new UsersLogs("logs/usersLogs.log");
const log = usersLogs.getLogger();

// create json web token
export const createAccessToken = (user: user) => {
  user.password = undefined;
  return jwt.sign({ user }, accessSecretKey, {
    expiresIn: "10m",
  });
};

const createRefreshToken = (user: user) => {
  user.password = undefined;
  return jwt.sign({ user }, refreshSecretKey);
};

export const signUp_post = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const isUsernameExist = await getUserByUserName(username);
    const isEmailExist = await getUserByEmail(email);

    if (isEmailExist) {
      log.error(
        "user failed to create: ",
        email,
        username,
        "Email already exist"
      );
      return res.status(409).json({ message: "Email already exist" });
    }
    if (isUsernameExist) {
      log.error(
        "user failed to create: ",
        email,
        username,
        "Username already exist"
      );
      return res.status(409).json({ message: "Username already exist" });
    }

    const newUser: user = {
      name: username,
      email: email,
      isAdmin: false,
      isSuperAdmin: false,
      teamId: null,
      password: hashSync(password, genSaltSync(10)),
    };

    await User.create(newUser);

    newUser.password = undefined;
    const token = createAccessToken(newUser);
    const refreshToken = createRefreshToken(newUser);
    res.cookie("Access-Token", `Bearer ${token}`, {
      httpOnly: true,
    });
    res.cookie("Refresh-Token", `Bearer ${refreshToken}`, { httpOnly: true });
    log.info("user sign up: ", email, username);
    return res.status(201).json({
      user: username,
      email: email,
      isAdmin: false,
      isSuperAdmin: false,
      teamId: null,
    });
  } catch (error) {
    log.error("user failed to create: ", email, username, error);
    console.log(error);
    return res.status(500).json({ message: "Signup failed" });
  }
};

export const login_post = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existUser = await getUserByEmail(email);
    if (!existUser) {
      log.error(
        "user failed to connect: ",
        email,
        "Incorrect email or password"
      );
      return res.status(404).json({ message: "Incorrect email or password" });
    }
    const auth = compareSync(password, existUser.password);
    if (!auth) {
      log.error(
        "user failed to connect: ",
        email,
        "Incorrect email or password"
      );
      return res.status(404).json({ message: "Incorrect email or password" });
    }
    const userToken: any = {
      name: existUser.name,
      email: existUser.email,
      teamId: existUser.teamId,
      isAdmin: existUser.isAdmin,
      isSuperAdmin: existUser.isSuperAdmin,
    };
    const token = createAccessToken(userToken);
    const refreshToken = createRefreshToken(userToken);
    res.cookie("Access-Token", `Bearer ${token}`, {
      httpOnly: true,
    });
    res.cookie("Refresh-Token", `Bearer ${refreshToken}`, { httpOnly: true });
    log.info("user connected: ", userToken.name);
    return res.status(200).json({
      name: existUser.name,
      email: existUser.email,
      teamId: existUser.teamId,
      isAdmin: existUser.isAdmin,
      isSuperAdmin: existUser.isSuperAdmin,
    });
  } catch (error) {
    log.error("user failed to connect: ", error);
    console.log(error);
    return res.status(500).json({ message: "Failed to log in" });
  }
};

export const users_get = async (req: Request, res: Response) => {
  const { user } = req.body;
  const { teamId }: any = req.query;
  if (!user.isSuperAdmin && !user.isAdmin) {
    return res.status(401).json({ message: "Bad request" });
  }
  if (user.isSuperAdmin) {
    try {
      const usersArray = await getAllUsers();
      return res.status(200).json({ usersArray });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to get all users" });
    }
  }
  if (user.isAdmin) {
    if (teamId === "none") {
      try {
        const usersArray = await getAllEmployeesWithoutTeam();
        return res.status(200).json({ usersArray });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed Get all employees" });
      }
    } else {
      try {
        const usersArray = await getEmployeesByTeamId(teamId);
        return res.status(200).json({ usersArray });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get employees" });
      }
    }
  }
};

export const change_props_put = async (req: Request, res: Response) => {
  const users: user[] = req.body;
  const { teamId, isAdmin, newEmail, currentPassword, newPassword }: any =
    req.query;
  if (teamId) {
    const response = await updateTeam(users, teamId);
    if (response === "success") {
      return res.status(200).json({ message: "Successfully updated team" });
    } else {
      return res.status(400).json({ message: "Failed to updated team" });
    }
  }
  if (isAdmin) {
    const response = await updateAdmin(users, isAdmin);
    if (response === "success") {
      return res.status(200).json("Successfully updated admin status");
    } else {
      return res.status(400).json("Failed to updated admin status");
    }
  }
  if (currentPassword) {
    try {
      const user = await getUserByEmail(users[0].email);
      const auth = compareSync(currentPassword, user.password);
      if (!auth) {
        return res.status(404).json({ message: "Incorrect password" });
      }
      const isExist = await getUserByEmail(newEmail);
      if (isExist) {
        return res.status(409).json({ message: "Email already exist" });
      }
      const response = await updateEmailOrPassword(
        users[0],
        newEmail,
        newPassword
      );
      if (response === "success") {
        return res.status(200).json({ message: "Successfully updated" });
      } else {
        return res.status(500).json({ message: "Failed to updated" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to updated" });
    }
  }
};

export const logout_get = (req: Request, res: Response) => {
  res.cookie("Access-Token", "logged out", { maxAge: 1 });
  res.cookie("Refresh-Token", "logged out", { maxAge: 1 });
  return res.status(200).json({ message: "User logged out" });
};

export const token_get = (req: Request, res: Response) => {
  return res.status(200).json({ user: res.locals.user });
};

export const changeTeamId = async (req: Request, res: Response) => {
  const { oldId, newId, isAdmin }: any = req.body;
  if (isAdmin) {
    try {
      await changeTeamIdQuery(oldId, newId);
      return res.status(200).json({ message: "Success updating team id" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to update team id" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized user" });
  }
};
