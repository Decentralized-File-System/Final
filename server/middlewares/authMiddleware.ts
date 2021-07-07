require("dotenv").config();
import { RequestHandler } from "express";
import { createAccessToken } from "../controllers/usersController";
import { getUserByEmail } from "../DBQueries/userQueries";
//@ts-ignore
const jwt = require("jsonwebtoken");

const checkUser: RequestHandler = async (req, res, next) => {
  let token = req.cookies["Access-Token"];
  let refreshToken = req.cookies["Refresh-Token"];
  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }
  token = token.split(" ")[1];

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }
  refreshToken = refreshToken.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_SECRET_KEY,
    async (err: any, decoded: any) => {
      if (err) {
        if (err.message === "jwt expired") {
          jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET_KEY,
            async (err: any, decoded: any) => {
              if (err) {
                return res
                  .status(403)
                  .json({ message: "Invalid refresh token" });
              } else {
                const user = await getUserByEmail(decoded.user.email);
                const newUser = {
                  name: user.name,
                  email: user.email,
                  isAdmin: user.isAdmin,
                  isSuperAdmin: user.isSuperAdmin,
                  teamId: user.teamId,
                  password: undefined,
                };
                const accessToken = createAccessToken(newUser);
                res.cookie("Access-Token", `Bearer ${accessToken}`, {
                  httpOnly: true,
                });
                res.locals.user = {
                  name: user.name,
                  email: user.email,
                  isAdmin: user.isAdmin,
                  isSuperAdmin: user.isSuperAdmin,
                  teamId: user.teamId,
                };
                next();
              }
            }
          );
        } else {
          return res.status(403).json({ message: "Invalid access token" });
        }
      } else {
        const user = await getUserByEmail(decoded.user.email);
        const newUser = {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isSuperAdmin: user.isSuperAdmin,
          teamId: user.teamId,
        };
        res.locals.user = newUser;
        next();
      }
    }
  );
};

export default checkUser;
