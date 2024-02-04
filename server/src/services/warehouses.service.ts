//import module
import {
  Warehouse,
  WarehouseItem,
  warehouseConverter,
  warehouseItemConverter,
} from "../models/warehouses";
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

  async getWarehouseItems(id: string) {
    try {
      const warehouseItemsRef = db.collection("warehouses/" + id + "/items");
      let warehouseItems: WarehouseItem[] = new Array();
      await warehouseItemsRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          warehouseItems.push(warehouseItemConverter.fromFirestore(doc));
        });
      });
      return warehouseItems;
    } catch (error) {
      console.log(error);
    }
  }
}

//export the class
export const warehouseServices = new warehouseService();
