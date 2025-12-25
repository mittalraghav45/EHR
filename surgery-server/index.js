const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Surgery server is running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Basic error handler to avoid crashing on unexpected errors.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // In real deployments consider structured logging.
  console.error("Unexpected error", err);
  res.status(500).json({ error: "Internal server error" });
});

const server = app.listen(PORT, () => {
  console.log(`Surgery server listening on port ${PORT}`);
});

module.exports = { app, server };
