import { $authApi } from "@api/authApi";

class ComputerService {
  async getComputers() {
    return $authApi.get("/computers");
  }

  async getComputer(computerId: number) {
    return $authApi.get(`/computers/${computerId}`);
  }
}

export default new ComputerService();
