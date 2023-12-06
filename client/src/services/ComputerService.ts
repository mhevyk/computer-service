import { $publicApi } from "../axios/publicApi";

class ComputerService {
  async getComputers() {
    return $publicApi.get("/computers");
  }
}

export default new ComputerService();
