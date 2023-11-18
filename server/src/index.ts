import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { sequelize } from "./database/sequelize";
import authRoutes from "./routes/auth";
import errorMiddleware from "./middlewares/error";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use(errorMiddleware);

function handleListen() {
  console.log(`Server started on http://localhost:${PORT}/`);
}

async function start() {
  await sequelize.authenticate();
  app.listen(PORT, handleListen);
}

start();
