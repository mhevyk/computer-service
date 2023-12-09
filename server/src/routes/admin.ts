import { Router } from "express";
import AdminController from "../controllers/admin";
import validateMiddleware from "../middlewares/validate";
import usernameValidator from "../validators/usernameValidator";
import passwordValidator from "../validators/passwordValidator";
import roleValidator from "../validators/roleValidator";
import authMiddleware from "../middlewares/auth";
import roleMiddleware from "../middlewares/role";

const router = Router();

router.post(
  "/registration",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  usernameValidator,
  passwordValidator,
  roleValidator,
  validateMiddleware,
  AdminController.registrationRole
);

export default router;
