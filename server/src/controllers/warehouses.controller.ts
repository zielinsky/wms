import { ActionType } from "../models/logs";
import { logServices } from "../services/logs.service";
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
  updateWarehouseItemAmount = async (req: Request, res: Response) => {
    const warehouseId = req.params.id;
    const itemId = req.body.itemId;
    const userId = req.body.userId;
    const prevAmount = Number(req.body.prevAmount);
    const currAmount = Number(req.body.currAmount);
    const ans = await warehouseServices.updateWarehouseItemAmount(
      warehouseId,
      itemId,
      currAmount
    );
    if (ans == 1) {
      await logServices.addLog(
        currAmount - prevAmount > 0 ? ActionType.PUT : ActionType.TAKE,
        prevAmount,
        currAmount,
        userId,
        warehouseId,
        itemId
      );
      res.send();
    } else res.status(404).send();
  };

  addWarehouseItem = async (req: Request, res: Response) => {
    const warehouseId = req.params.id;
    const name = req.body.name;
    const userId = req.body.userId;
    const amount = Number(req.body.amount);
    const ans = await warehouseServices.addWarehouseItemAmount(
      warehouseId,
      name,
      amount
    );
    if (ans != "-1") {
      await logServices.addLog(
        ActionType.ADD,
        0,
        amount,
        userId,
        warehouseId,
        ans
      );
      res.send({ id: ans });
    } else res.status(500).send();
  };
}

//export class
export const WarehousesController = new warehousesController();
