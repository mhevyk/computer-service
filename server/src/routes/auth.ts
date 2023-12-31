import { Router } from "express";
import AuthController from "../controllers/auth";
import validateMiddleware from "../middlewares/validate";
import usernameValidator from "../validators/usernameValidator";
import passwordValidator from "../validators/passwordValidator";

const router = Router();

router.post(
  "/registration",
  usernameValidator,
  passwordValidator,
  validateMiddleware,
  AuthController.registration
);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/refresh", AuthController.refresh);

export default router;
