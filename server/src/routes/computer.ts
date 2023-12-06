import { Router } from "express";
import ComputerController from "../controllers/computer";

const router = Router();

router.get("/", ComputerController.getComputers);

export default router;
