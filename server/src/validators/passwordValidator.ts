import { body } from "express-validator";

export default body(
  "password",
  "Пароль повинен мати мінімум 4 символи, максимум 18"
).isLength({ min: 4, max: 18 });
