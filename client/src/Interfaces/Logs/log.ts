export enum ActionType {
  TAKE = "TAKE",
  PUT = "PUT",
  ADD = "ADD",
  DELETE = "DELETE",
}

export interface LogI {
  id: string;
  timestamp: Date;
  type: ActionType;
  prevAmount: number;
  currAmount: number;
  userId: string;
  warehouseId: string;
  itemId: string;
  itemName: string;
}
