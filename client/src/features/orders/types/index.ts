import { Computer } from "@features/computers/types";

export type OrderStatus =
  | "ACCEPTED"
  | "IN_PROCESS"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELED";

export type Order = {
  order_id: number;
  computer_id: number;
  user_id: number;
  status: OrderStatus;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  computer: Computer;
};
