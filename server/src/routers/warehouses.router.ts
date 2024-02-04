//importing modules
import { Router } from "express";
import { WarehousesController } from "../controllers/warehouses.controller";

const router = Router();

router.get("/", WarehousesController.getWarehouses);
router.get("/:id/items", WarehousesController.getWarehouseItems);

export default { router };
