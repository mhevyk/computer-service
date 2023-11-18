import { Router } from "express";
import AuthController from "../controllers/auth";
import validateMiddleware from "../middlewares/validate";
import { body } from "express-validator";
import { ROLES, checkRoleValid } from "../permissions/roles";

const router = Router();

router.post(
  "/registration",
  body("username", "Ім'я користувача не повинно бути порожнім").notEmpty(),
  body(
    "password",
    "Пароль повинен мати мінімум 4 символи, максимум 18"
  ).isLength({ min: 4, max: 18 }),
  body("role", "Такої ролі не існує")
    .default(ROLES.USER)
    .custom(role => checkRoleValid(role)),
  validateMiddleware,
  AuthController.registration
);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/refresh", AuthController.refresh);

export default router;
