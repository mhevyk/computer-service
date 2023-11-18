import { body } from "express-validator";

export default body(
  "username",
  "Ім'я користувача не повинно бути порожнім"
).notEmpty();
