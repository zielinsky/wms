//importing modules
import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

//get users
router.get("/", UserController.getUsers);

export default { router };
