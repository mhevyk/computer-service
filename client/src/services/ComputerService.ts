import { $publicApi } from "../api/publicApi";

class ComputerService {
  async getComputers() {
    return $publicApi.get("/computers");
  }

  async getComputer(computerId: number) {
    return $publicApi.get(`/computers/${computerId}`);
  }
}

export default new ComputerService();
