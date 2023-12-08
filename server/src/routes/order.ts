import { Router } from "express";
import OrderController from "../controllers/order";
import authMiddleware from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, OrderController.createOrder);

export default router;
