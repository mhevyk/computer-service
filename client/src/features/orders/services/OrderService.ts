import { $authApi } from "@api/authApi";
import { Order } from "../types";

export type OrderRecord = {
  computer_id: number;
  quantity: number;
};

export class OrderService {
  static createOrder(orderRecords: OrderRecord[]) {
    return $authApi.post("/orders/create", { orderRecords });
  }

  static getOrders() {
    return $authApi.get<Order[]>("/orders");
  }
}
