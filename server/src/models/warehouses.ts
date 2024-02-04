import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

export class Warehouse {
  id: string;
  name: string;
  items?: Array<WarehouseItem>;

  constructor(id: string, name: string, items?: Array<WarehouseItem>) {
    this.id = id;
    this.name = name;
    this.items = items;
  }
}

export class WarehouseItem {
  id: string;
  name: string;
  amount: number;

  constructor(id: string, name: string, amount: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  }
}

export const warehouseConverter = {
  toFirestore: (warehouse: Warehouse) => {
    return {
      name: warehouse.name,
      items: warehouse.items,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>) => {
    const data = snapshot.data();
    if (data) return new Warehouse(snapshot.id, data.name);
    else throw new Error("Unable to read snapshot from firestore");
  },
};

export const warehouseItemConverter = {
  toFirestore: (warehouseItem: WarehouseItem) => {
    return {
      name: warehouseItem.name,
      amount: warehouseItem.amount,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>) => {
    const data = snapshot.data();
    if (data) return new WarehouseItem(snapshot.id, data.name, data.amount);
    else throw new Error("Unable to read snapshot from firestore");
  },
};
