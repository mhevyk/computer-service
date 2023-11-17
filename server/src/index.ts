import "dotenv/config";
import express from "express";
import { sequelize } from "./database/sequelize";

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

function handleListen() {
  console.log(`Server started on http://localhost:${PORT}/`);
}

async function start() {
  await sequelize.authenticate();
  app.listen(PORT, handleListen);
}

start();
