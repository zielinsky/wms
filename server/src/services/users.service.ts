import { User, userConverter } from "../models/users";
import { db } from "../../firebase";

export class usersService {
  async getUsers() {
    try {
      const usersRef = db.collection("users");
      let users: User[] = new Array();
      await usersRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          users.push(userConverter.fromFirestore(doc));
        });
      });
      return users;
    } catch (error) {
      console.log(error);
    }
  }
}

//export the class
export const usersServices = new usersService();
