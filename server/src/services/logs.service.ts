import { Timestamp } from "firebase-admin/firestore";
import { db } from "../../firebase";
import { ActionType, Log, logConverter } from "../models/logs";

export class logService {
  async getLogs(type?: ActionType) {
    try {
      let logsRef;
      if (type != undefined) {
        logsRef = db.collection("logs").where("type", "==", type);
      } else {
        logsRef = db.collection("logs");
      }
      let logs: Log[] = [];
      const snapshot = await logsRef.get();
      snapshot.forEach((doc) => {
        logs.push(logConverter.fromFirestore(doc));
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
    itemId: string,
    itemName: string
  ) {
    try {
      const id = await db
        .collection("logs")
        .add(
          logConverter.toFirestore(
            new Log(
              "",
              new Date(),
              type,
              prevAmount,
              currAmount,
              userId,
              warehouseId,
              itemId,
              itemName
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
