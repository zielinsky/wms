import { Router } from "express";
import { LogsController } from "../controllers/logs.controller";

const router = Router();

router.get("/:type", LogsController.getLogs);

export default { router };
