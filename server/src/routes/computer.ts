import { Router } from "express";
import ComputerController from "../controllers/computer";

const router = Router();

router.get("/", ComputerController.getComputers);
router.get("/:computerId", ComputerController.getComputer);

export default router;
