//import modules
import { warehouseServices } from "../services/warehouses.service";
import { Request, Response } from "express";

class warehousesController {
  getWarehouses = async (req: Request, res: Response) => {
    const users = await warehouseServices.getWarehouses();
    res.send(users);
  };
}

//export class
export const WarehousesController = new warehousesController();
