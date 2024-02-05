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

  getWarehouseWithItems = async (req: Request, res: Response) => {
    const warehousesWithItems =
      await warehouseServices.getWarehousesWithItems();
    res.send(warehousesWithItems);
  };

  updateWarehouseItemAmmount = async (req: Request, res: Response) => {
    const warehouseId = req.params.id;
    const itemId = req.body.itemId;
    const amount = Number(req.body.amount);
    await warehouseServices.updateWarehouseItemAmmount(
      warehouseId,
      itemId,
      amount
    );
    res.send();
  };
}

//export class
export const WarehousesController = new warehousesController();