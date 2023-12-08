import OrderModel from "../database/models/order.model";
import { sequelize } from "../database/sequelize";

class OrderService {
  async createOrder(user_id: number, computerIds: number[]) {
    const transaction = await sequelize.transaction();
    try {
      const orders = await OrderModel.bulkCreate(
        computerIds.map(computerId => ({ user_id, computer_id: computerId })),
        { transaction }
      );

      transaction.commit();

      return orders;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }
}

export default new OrderService();
