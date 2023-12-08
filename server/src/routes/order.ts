import { Router } from "express";
import OrderController from "../controllers/order";
import authMiddleware from "../middlewares/auth";

const router = Router();

router.post("/create", authMiddleware, OrderController.createOrder);
router.get("/", authMiddleware, OrderController.getOrders);

export default router;
