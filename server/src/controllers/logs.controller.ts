import { Request, Response } from "express";
import { logServices } from "../services/logs.service";
import { ActionType } from "../models/logs";

class logsController {
  getLogs = async (req: Request, res: Response) => {
    const type = req.params.type.toUpperCase() as ActionType;
    const logs =
      req.params.type != "all"
        ? await logServices.getLogs(type)
        : await logServices.getLogs();
    res.send(logs);
  };
}

//export class
export const LogsController = new logsController();
