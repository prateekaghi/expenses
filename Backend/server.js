const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user-routes");
const expenseRoutes = require("./routes/expense-routes");
const categoryRoutes = require("./routes/category-routes");
const timezoneRoutes = require("./routes/timezone-routes");

const dotenv = require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/timezone", timezoneRoutes);

//error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "Something went wrong!" });
});

mongoose
  .connect(`${process.env.MONGO_URI}${process.env.MONGO_DB}`)
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => console.error(err));
