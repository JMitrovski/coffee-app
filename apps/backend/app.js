const express = require("express");

const app = express();

const coffeeRoutes = require("./routes/coffeeRoutes");
const modificationsRoutes = require("./routes/modificationsRoutes");

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/coffee", coffeeRoutes);
app.use("/api/v1/modifications", modificationsRoutes);

module.exports = app;
