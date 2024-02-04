//import modules
import { usersServices } from "../services/users.service";
import { Request, Response } from "express";

class usersController {
  //get all posts
  getUsers = async (req: Request, res: Response) => {
    const users = await usersServices.getUsers();
    res.send(users);
  };
}

//export class
export const UsersController = new usersController();
