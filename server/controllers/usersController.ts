require("dotenv").config();
import bcrypt, { hashSync, genSaltSync, compareSync } from "bcrypt";
// @ts-ignore
import { User } from "../models";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { user } from "../types";
import { getUserByUserName, getUserByEmail } from "../utils/DBqueries";
const accessSecretKey: any = process.env.ACCESS_SECRET_KEY;
const refreshSecretKey: any = process.env.REFRESH_SECRET_KEY;

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

    if (isUsernameExist) {
      return res.status(409).send("Username already exist");
    }
    if (isEmailExist) {
      return res.status(409).send("Email already exist");
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
    return res.status(201).json({
      user: username,
      email: email,
      isAdmin: false,
      isSuperAdmin: false,
      teamId: null,
    });
  } catch (error) {
    return res.status(500).send("Signup failed");
  }
};

export const login_post = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existUser = await getUserByEmail(email);
    if (!existUser) {
      return res.status(404).send("Incorrect email or password");
    }
    const auth = compareSync(password, existUser.password);
    if (!auth) {
      return res.status(404).send("Incorrect email or password");
    }
    const userToken: any = {
      username: existUser.name,
      email: existUser.email,
    };
    const token = createAccessToken(userToken);
    const refreshToken = createRefreshToken(userToken);
    res.cookie("Access-Token", `Bearer ${token}`, {
      httpOnly: true,
    });
    res.cookie("Refresh-Token", `Bearer ${refreshToken}`, { httpOnly: true });

    return res.status(200).json({
      name: existUser.name,
      email: existUser.email,
      teamId: existUser.teamId,
      isAdmin: existUser.isAdmin,
      isSuperAdmin: existUser.isSuperAdmin,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const logout_get = (req: Request, res: Response) => {
  res.cookie("Access-Token", "logged out", { maxAge: 1 });
  res.cookie("Refresh-Token", "logged out", { maxAge: 1 });
  res.status(200).send("user logged out");
};

export const token_get = (req: Request, res: Response) => {
  res.status(200).json({ user: res.locals.user });
};
