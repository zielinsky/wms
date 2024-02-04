//import modules
import { userServices } from "../services/user.service";
import { Request, Response } from "express";

class userController {
  //get all posts
  getUsers = async (req: Request, res: Response) => {
    const users = await userServices.getUsers();
    res.send(users);
  };
}

//export class
export const UserController = new userController();
