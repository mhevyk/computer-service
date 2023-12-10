import "./config";
import express from "express";
import cookieParser from "cookie-parser";
import { sequelize } from "./database/sequelize";
import authRoutes from "./routes/auth";
import computerRoutes from "./routes/computer";
import adminPanelRoutes from "./routes/admin";
import orderRoutes from "./routes/order";
import errorMiddleware from "./middlewares/error";
import corsMiddleware from "./middlewares/cors";
import { IS_PROD } from "./constants/global";

const PORT = process.env.PORT || 5000;

export const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/admin-panel", adminPanelRoutes);
app.use("/computers", computerRoutes);
app.use("/orders", orderRoutes);
app.use(errorMiddleware);

function handleListen() {
  console.log(`Server started on http://localhost:${PORT}/`);
}

if (IS_PROD) {
  const backupDatabaseJob = require("./jobs/backupDatabase");
  backupDatabaseJob.start();
}

async function start() {
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(PORT, handleListen);
}

start();
