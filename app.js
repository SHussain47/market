import express from "express";
const app = express();
export default app;

import morgan from "morgan";
import getUserFromToken from "#middleware/getUserFromToken";
import usersRouter from "#api/users";

// JSON Parser
app.use(express.json());
app.use(morgan("dev"));

app.use(getUserFromToken);

// Paths
app.use("/users", usersRouter);

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  switch (error.code) {
    case "22P02":
      return res.status(400).json({ error: error.message });
    case "23505":
    case "23503":
      return res.status(400).json({ error: error.detail });
    default:
      return next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Something went wrong!" });
});
