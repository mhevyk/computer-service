import { ForeignKeyConstraintError } from "sequelize";
import OrderModel from "../database/models/order.model";
import { sequelize } from "../database/sequelize";
import APIError from "../exceptions/APIError";

type OrderRecord = {
  computer_id: number;
  quantity: number;
  price: number;
};

class OrderService {
  async createOrder(user_id: number, orderRecords: OrderRecord[]) {
    const transaction = await sequelize.transaction();
    try {
      const orders = await OrderModel.bulkCreate(
        orderRecords.map(({ computer_id, quantity, price }) => {
          return { user_id, computer_id, quantity, price };
        }),
        { transaction }
      );

      transaction.commit();

      return orders;
    } catch (error) {
      transaction.rollback();

      if (error instanceof ForeignKeyConstraintError) {
        const detail = (error.original as any).detail as string; // TODO: fix type error or use another approach
        const match = detail.match(/\((\d+)\)/);

        let errorMessage = "Один з переданих комп'ютерів не існує";

        if (match) {
          errorMessage = `Комп'ютер з id '${match[1]}' не існує у базі даних'`;
        }

        throw APIError.BadRequest(errorMessage);
      }

      throw error;
    }
  }
}

export default new OrderService();
