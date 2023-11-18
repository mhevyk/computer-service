import "dotenv/config";
import express from "express";
import { sequelize } from "./database/sequelize";
import RoleModel from "./database/models/role.model";
import UserModel from "./database/models/user.model";

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
  const response = await UserModel.findOne({
    include: [
      {
        model: RoleModel,
        attributes: ["name"],
      },
    ],
  });

  if (response !== null) {
    console.log(response);
  }

  app.listen(PORT, handleListen);
}

start();
