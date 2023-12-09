import { Router } from "express";
import ComputerController from "../controllers/computer";
import authMiddleware from "../middlewares/auth";

const router = Router();

router.get("/", authMiddleware, ComputerController.getComputers);
router.get("/:computerId", authMiddleware, ComputerController.getComputer);

export default router;
