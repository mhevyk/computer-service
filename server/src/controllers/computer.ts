import { NextFunction, Request, Response } from "express";
import ComputerService from "../services/computer";

class ComputerController {
  async getComputers(req: Request, res: Response, next: NextFunction) {
    try {
      const computers = await ComputerService.getComputers();
      console.log(computers);
      res.json(computers);
    } catch (error) {
      next(error);
    }
  }
}

export default new ComputerController();
