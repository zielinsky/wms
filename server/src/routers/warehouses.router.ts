import { Router } from "express";
import { WarehousesController } from "../controllers/warehouses.controller";

const router = Router();

router.get("/", WarehousesController.getWarehouses);
router.get("/items", WarehousesController.getWarehouseWithItems);
router.get("/:id/items", WarehousesController.getWarehouseItems);
router.post("/:id/items", WarehousesController.addWarehouseItem);
router.delete("/:id/items/:itemId", WarehousesController.deleteWarehouseItem);
router.put(
  "/:id/items/:itemId",
  WarehousesController.updateWarehouseItemAmount
);

export default { router };
