const ErrorModel = require("../models/error");
const { verifyToken } = require("../utils/tokenUtils");

const config = require("dotenv").config();

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const err = new ErrorModel("Missing token", 401);
      return next(err);
    }
    const { payload } = await verifyToken({ token });
    const { id, first_name, last_name, email } = payload;
    req.userData = {
      userid: id,
      first_name,
      last_name,
      email,
    };
    console.log(req.userData);
    next();
  } catch (error) {
    const err = new ErrorModel("Error while checking auth.", 401);
    return next(err);
  }
};
