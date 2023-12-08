import { $authApi } from "@api/authApi";

export type OrderRecord = {
  computer_id: number;
  quantity: number;
};

export class OrderService {
  static order(orderRecords: OrderRecord[]) {
    return $authApi.post("/orders/create", { orderRecords });
  }
}
