import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { sequelize } from "./database/sequelize";
import authRoutes from "./routes/auth";
import computerRoutes from "./routes/computer";
import adminPanelRoutes from "./routes/admin";
import errorMiddleware from "./middlewares/error";
import corsMiddleware from "./middlewares/cors";
import backupDatabaseJob from "./jobs/backupDatabase";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/admin-panel", adminPanelRoutes);
app.use("/computers", computerRoutes);
app.use(errorMiddleware);

function handleListen() {
  console.log(`Server started on http://localhost:${PORT}/`);
}

//backupDatabaseJob.start();

async function start() {
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(PORT, handleListen);
}

start();
