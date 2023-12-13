import { NextFunction, Request, Response } from "express";
import ComputerService from "../services/computer";

class ComputerController {
  async getComputers(req: Request, res: Response, next: NextFunction) {
    try {
      const computers = await ComputerService.getComputers();
      res.json(computers);
    } catch (error) {
      next(error);
    }
  }

  async getComputer(
    req: Request<{ computerId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const computerId = Number(req.params.computerId);
      const computer = await ComputerService.getComputer(computerId);
      return res.json(computer);
    } catch (error) {
      next(error);
    }
  }
}

export default new ComputerController();
