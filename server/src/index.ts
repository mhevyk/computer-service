import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { sequelize } from "./database/sequelize";
import authRoutes from "./routes/auth";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());
app.use("/auth", authRoutes);

function handleListen() {
  console.log(`Server started on http://localhost:${PORT}/`);
}

async function start() {
  await sequelize.authenticate();
  app.listen(PORT, handleListen);
}

start();
