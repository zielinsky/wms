//importing modules
import { Router } from "express";
import { WarehousesController } from "../controllers/warehouses.controller";

const router = Router();

//get users
router.get("/", WarehousesController.getWarehouses);

export default { router };
