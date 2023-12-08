import { NextFunction, Request, Response } from "express";
import OrderService from "../services/order";

class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { computerIds } = req.body;
      const result = await OrderService.createOrder(req.user?.id!, computerIds);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
