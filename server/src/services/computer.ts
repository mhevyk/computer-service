import ComponentModel from "../database/models/component.model";
import ComputerModel from "../database/models/computer.model";
import APIError from "../exceptions/APIError";

class ComputerService {
  async getComputers() {
    const computers = await ComputerModel.findAll({
      include: [ComponentModel],
    });

    return computers;
  }

  async getComputer(computerId: number) {
    const computer = await ComputerModel.findByPk(computerId, {
      include: [ComponentModel],
    });

    if (computer === null) {
      throw APIError.NotFound(
        `Комп'ютер з ідентифікатором '${computerId}' не був знайдений`
      );
    }

    return computer;
  }
}

export default new ComputerService();
