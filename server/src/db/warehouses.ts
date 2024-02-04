import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

class Warehouse {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export const warehouseConverter = {
  toFirestore: (warehouse: Warehouse) => {
    return {
      name: warehouse.name,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>) => {
    const data = snapshot.data();
    if (data) return new Warehouse(data.id, data.name);
    else throw new Error("Unable to read snapshot from firestore");
  },
};
