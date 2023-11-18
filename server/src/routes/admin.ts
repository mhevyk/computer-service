import { Router } from "express";
import AdminController from "../controllers/admin";
import validateMiddleware from "../middlewares/validate";
import usernameValidator from "../validators/usernameValidator";
import passwordValidator from "../validators/passwordValidator";
import roleValidator from "../validators/roleValidator";

const router = Router();

router.post(
  "/registration",
  usernameValidator,
  passwordValidator,
  roleValidator,
  validateMiddleware,
  AdminController.registrationRole
);

export default router;
