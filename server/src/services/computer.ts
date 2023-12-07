import ComponentModel from "../database/models/component.model";
import ComputerModel from "../database/models/computer.model";

class ComputerService {
  async getComputers() {
    const computers = await ComputerModel.findAll({
      include: [ComponentModel],
    });

    return computers;
  }
}

export default new ComputerService();
