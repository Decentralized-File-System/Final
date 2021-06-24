require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkUser = async (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        return res.status(401).send("Unauthorized user");
      } else {
        next();
      }
    });
  }else {
      return res.status(401).send("Access Token Required")
  }
};

module.exports = { checkUser }