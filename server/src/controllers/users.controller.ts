import { usersServices } from "../services/users.service";
import { Request, Response } from "express";

class usersController {
  getUsers = async (req: Request, res: Response) => {
    const users = await usersServices.getUsers();
    res.send(users);
  };
}

export const UsersController = new usersController();
