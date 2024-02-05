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
    const itemId = req.params.itemId;
    const userId = req.body.userId;
    const delta = Number(req.body.delta);
    const item = await warehouseServices.getWarehouseItem(warehouseId, itemId);
    if (item == undefined) {
      res.status(404).send();
      return;
    }
    const ans = await warehouseServices.updateWarehouseItemAmount(
      warehouseId,
      itemId,
      item.amount + delta
    );
    if (ans == 1) {
      await logServices.addLog(
        delta > 0 ? ActionType.PUT : ActionType.TAKE,
        item.amount,
        item.amount + delta,
        userId,
        warehouseId,
        itemId,
        item.name
      );
      res.send();
    } else res.status(404).send();
  };

  deleteWarehouseItem = async (req: Request, res: Response) => {
    const warehouseId = req.params.id;
    const itemId = req.params.itemId;
    const userId = req.body.userId;
    const item = await warehouseServices.getWarehouseItem(warehouseId, itemId);
    const ans = await warehouseServices.deleteWarehouseItem(
      warehouseId,
      itemId
    );
    if (ans == 1 && item !== undefined) {
      await logServices.addLog(
        ActionType.DELETE,
        item.amount,
        0,
        userId,
        warehouseId,
        itemId,
        item.name
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
        ans,
        name
      );
      res.send({ id: ans });
    } else res.status(500).send();
  };
}

//export class
export const WarehousesController = new warehousesController();
