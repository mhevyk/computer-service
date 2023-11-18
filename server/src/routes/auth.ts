import { Router } from "express";
import AuthController from "../controllers/auth";

const router = Router();

router.post("/registration", AuthController.registration);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/refresh", AuthController.refresh);

export default router;
