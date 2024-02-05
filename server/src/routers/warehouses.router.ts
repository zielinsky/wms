import { Router } from "express";
import { WarehousesController } from "../controllers/warehouses.controller";

const router = Router();

router.get("/", WarehousesController.getWarehouses);
router.get("/items", WarehousesController.getWarehouseWithItems);
router.get("/:id/items", WarehousesController.getWarehouseItems);
router.put("/:id/items", WarehousesController.updateWarehouseItemAmmount);
router.post("/:id/items", WarehousesController.addWarehouseItem);

export default { router };
