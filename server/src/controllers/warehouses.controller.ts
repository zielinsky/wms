//import modules
import { warehouseServices } from "../services/warehouses.service";
import { Request, Response } from "express";

class warehousesController {
  getWarehouses = async (req: Request, res: Response) => {
    const warehouses = await warehouseServices.getWarehouses();
    res.send(warehouses);
  };

  getWarehouseItems = async (req: Request, res: Response) => {
    const id = req.params.id;
    const warehouseItems = await warehouseServices.getWarehouseItems(id);
    res.send(warehouseItems);
  };
}

//export class
export const WarehousesController = new warehousesController();
