import {
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp,
  DocumentReference,
} from "firebase-admin/firestore";

export enum ActionType {
  TAKE = "TAKE",
  PUT = "PUT",
}

export class Log {
  id: string;
  timestamp: Timestamp;
  type: ActionType;
  prevAmount: number;
  currAmount: number;
  userRef: DocumentReference;
  warehouseRef: DocumentReference;
  itemRef: DocumentReference;

  constructor(
    id: string,
    timestamp: Timestamp,
    type: ActionType,
    prevAmount: number,
    currAmount: number,
    userRef: DocumentReference,
    warehouseRef: DocumentReference,
    itemRef: DocumentReference
  ) {
    this.id = id;
    this.timestamp = timestamp;
    this.type = type;
    this.prevAmount = prevAmount;
    this.currAmount = currAmount;
    this.userRef = userRef;
    this.warehouseRef = warehouseRef;
    this.itemRef = itemRef;
  }
}

export const logConverter = {
  toFirestore: (log: Log) => {
    return {
      timestamp: log.timestamp,
      type: log.type,
      prevAmount: log.prevAmount,
      currAmount: log.currAmount,
      userRef: log.userRef,
      warehouseRef: log.warehouseRef,
      itemRef: log.itemRef,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>) => {
    const data = snapshot.data();
    if (data)
      return new Log(
        snapshot.id,
        data.date,
        data.type,
        data.prevAmount,
        data.currAmount,
        data.userRef,
        data.warehouseRef,
        data.itemRef
      );
    else throw new Error("Unable to read snapshot from firestore");
  },
};
