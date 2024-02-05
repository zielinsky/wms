import { Timestamp } from "firebase-admin/firestore";
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
    prevAmount: number,
    currAmount: number,
    userId: string,
    warehouseId: string,
    itemId: string
  ) {
    try {
      const id = await db
        .collection("logs")
        .add(
          logConverter.toFirestore(
            new Log(
              "",
              Timestamp.fromDate(new Date()),
              type,
              prevAmount,
              currAmount,
              userId,
              warehouseId,
              itemId
            )
          )
        );
      return id;
    } catch (error) {
      console.log(error);
      return "-1";
    }
  }
}

//export the class
export const logServices = new logService();
