import ComputerModel from "../database/models/computer.model";

class ComputerService {
  async getComputers() {
    const computers = await ComputerModel.findAll();
    return computers;
  }
}

export default new ComputerService();
