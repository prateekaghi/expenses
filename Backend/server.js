const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const { swaggerDocument, swaggerUi } = require("./swaggerConfig");

const userRoutes = require("./routes/user-routes");
const expenseRoutes = require("./routes/expense-routes");
const categoryRoutes = require("./routes/category-routes");
const timezoneRoutes = require("./routes/timezone-routes");
const currencyRoutes = require("./routes/currency-routes");

require("dotenv").config();

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

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/timezone", timezoneRoutes);
app.use("/api/currency", currencyRoutes);

// Serve frontend in production
const __dirnameResolved = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirnameResolved, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirnameResolved, "../frontend/build/index.html"));
  });
}

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) return next(error);
  res
    .status(error.code || 500)
    .json({ message: error.message || "Something went wrong!" });
});

// Connect to MongoDB and start server
mongoose
  .connect(`${process.env.MONGO_URI}${process.env.MONGO_DB}`)
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
