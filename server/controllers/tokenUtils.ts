//@ts-ignore
const jwt = require("jsonwebtoken");

// create json web token
const createAccessToken = (user: {
  email: string;
  name: string;
  password: string | undefined;
}) => {
  user.password = undefined;
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};

module.exports = { createAccessToken };
