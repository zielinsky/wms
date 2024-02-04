//import module
import { Warehouse, warehouseConverter } from "../models/warehouses";
import { db } from "../../firebase";

export class warehouseService {
  async getWarehouses() {
    try {
      const warehousesRef = db.collection("warehouses");
      let warehouses: Warehouse[] = new Array();
      await warehousesRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          warehouses.push(warehouseConverter.fromFirestore(doc));
        });
      });
      return warehouses;
    } catch (error) {
      console.log(error);
    }
  }
}

//export the class
export const warehouseServices = new warehouseService();
