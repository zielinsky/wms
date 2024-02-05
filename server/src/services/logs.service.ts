import { db } from "../../firebase";
import { ActionType, Log, logConverter } from "../models/logs";

export class logService {
  async getLogs() {
    try {
      const logsRef = db.collection("logs");
      let logs: Log[] = [];
      await logsRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          logs.push(logConverter.fromFirestore(doc));
        });
      });
      return logs;
    } catch (error) {
      console.log(error);
    }
  }

  async addLog(
    type: ActionType,
    currAmount: number,
    userId: string,
    itemId: string,
    warehouseId: string
  ) {
    try {
      db.collection("logs").add();
    } catch (error) {
      console.log(error);
    }
  }
}

//export the class
export const logServices = new logService();
