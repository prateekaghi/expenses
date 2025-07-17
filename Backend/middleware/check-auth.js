const ErrorModel = require("../models/error");
const { jwtVerify } = require("jose");
require("dotenv").config();

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next(); // just return here
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const err = new ErrorModel("Missing Authorization header", 401);
      return next(err);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      const err = new ErrorModel("Missing token", 401);
      return next(err);
    }

    const { payload } = await jwtVerify(token, secret);

    req.userData = {
      userid: payload.id,
      email: payload.email,
    };

    next();
  } catch (error) {
    const err = new ErrorModel("Authentication failed.", 401);
    return next(err);
  }
};
