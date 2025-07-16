const ErrorModel = require("../models/error");
const { jwtVerify } = require("jose");

const config = require("dotenv").config();
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      const err = new ErrorModel("Missing token", 401);
      return next(err);
    }
    const { payload } = await jwtVerify(token, secret);

    console.log("payload", payload);
    req.userData = {
      userid: payload.id,
    };
    next();
  } catch (error) {
    const err = new ErrorModel("Not authenticated", 401);
    return next(err);
  }
};
