import {
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp,
} from "firebase-admin/firestore";

export enum ActionType {
  TAKE = "TAKE",
  PUT = "PUT",
  ADD = "ADD",
  DELETE = "DELETE",
}

export class Log {
  id: string;
  date: Date;
  type: ActionType;
  prevAmount: number;
  currAmount: number;
  userId: string;
  warehouseId: string;
  itemId: string;
  itemName: string;

  constructor(
    id: string,
    date: Date,
    type: ActionType,
    prevAmount: number,
    currAmount: number,
    userId: string,
    warehouseId: string,
    itemId: string,
    itemName: string
  ) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.prevAmount = prevAmount;
    this.currAmount = currAmount;
    this.userId = userId;
    this.warehouseId = warehouseId;
    this.itemId = itemId;
    this.itemName = itemName;
  }
}

export const logConverter = {
  toFirestore: (log: Log) => {
    return {
      timestamp: Timestamp.fromDate(log.date),
      type: log.type,
      prevAmount: log.prevAmount,
      currAmount: log.currAmount,
      userId: log.userId,
      warehouseId: log.warehouseId,
      itemId: log.itemId,
      itemName: log.itemName,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>) => {
    const data = snapshot.data();
    if (data)
      return new Log(
        snapshot.id,
        data.timestamp.toDate(),
        data.type,
        data.prevAmount,
        data.currAmount,
        data.userId,
        data.warehouseId,
        data.itemId,
        data.itemName
      );
    else throw new Error("Unable to read snapshot from firestore");
  },
};
