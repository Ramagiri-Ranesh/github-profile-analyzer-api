const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const githubRoutes = require("./routes/github.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "GitHub Profile Analyzer API is running",
  });
});

app.use("/api", githubRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
