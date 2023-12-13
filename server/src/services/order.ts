import { ForeignKeyConstraintError } from "sequelize";
import OrderModel from "../database/models/order.model";
import { sequelize } from "../database/sequelize";
import APIError from "../exceptions/APIError";
import ComputerModel from "../database/models/computer.model";
import { OrderRecord } from "../types/request";

class OrderService {
  async createOrder(userId: number, orderRecords: OrderRecord[]) {
    const transaction = await sequelize.transaction();
    try {
      const orders = await OrderModel.bulkCreate(
        orderRecords.map(({ computer_id, quantity, price }) => {
          return { user_id: userId, computer_id, quantity, price };
        }),
        { transaction }
      );

      transaction.commit();

      return orders;
    } catch (error) {
      transaction.rollback();

      if (error instanceof ForeignKeyConstraintError) {
        const detail = (error.original as any).detail as string; // TODO: fix type error or use another approach
        const computerIdMatch = detail.match(/\((computer_id)=(\d+)\)/);

        if (computerIdMatch) {
          throw APIError.BadRequest("Один з переданих комп'ютерів не існує");
        }

        const userIdMatch = detail.match(/\((user_id)=(\d+)\)/);

        if (userIdMatch) {
          throw APIError.Unauthourized();
        }
      }

      throw error;
    }
  }

  async getOrders(userId: number) {
    return await OrderModel.findAll({
      where: {
        user_id: userId,
      },
      order: [["created_at", "ASC"]],
      include: [ComputerModel],
    });
  }
}

export default new OrderService();
