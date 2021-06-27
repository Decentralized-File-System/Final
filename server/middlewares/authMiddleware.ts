require("dotenv").config();
import { RequestHandler } from "express";
import { createAccessToken } from "../controllers/usersController";
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

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      if (err.message === "jwt expired") {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_SECRET_KEY,
          (err: any, decoded: any) => {
            if (err) {
              return res.status(403).json({ message: "Invalid refresh token" });
            } else {
              const accessToken = createAccessToken(decoded.user);
              res.cookie("Access-Token", `Bearer ${accessToken}`, {
                httpOnly: true,
              });
              res.locals.user = decoded.user;
              next();
            }
          }
        );
      } else {
        return res.status(403).json({ message: "Invalid access token" });
      }
    } else {
      res.locals.user = decoded.user;
      next();
    }
  });
};

export default checkUser;
