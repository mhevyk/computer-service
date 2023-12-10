import { NextFunction, Request, Response } from "express";
import OrderService from "../services/order";
import { RequestWithBody, OrderRecord } from "../types/request";

class OrderController {
  async createOrder(
    req: RequestWithBody<{ orderRecords: OrderRecord[] }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { orderRecords } = req.body;
      const result = await OrderService.createOrder(
        req.user?.id!,
        orderRecords
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const orders = await OrderService.getOrders(user.id);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
