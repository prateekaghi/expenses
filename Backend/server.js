const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { swaggerDocument, swaggerUi } = require("./swaggerConfig");
const dotenv = require("dotenv").config();

swaggerDocument.servers = [{ url: process.env.SWAGGER_BASE_URL }];

const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const transactionsRoutes = require("./routes/transactions-routes");
const categoryRoutes = require("./routes/category-routes");
const timezoneRoutes = require("./routes/timezone-routes");
const currencyRoutes = require("./routes/currency-routes");

const app = express();

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/timezone", timezoneRoutes);
app.use("/api/currency", currencyRoutes);

//error handling middleware
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "Something went wrong!" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.error(err));
