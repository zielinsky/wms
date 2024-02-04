//importing modules
import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

const router = Router();

//get users
router.get("/", UsersController.getUsers);

export default { router };
