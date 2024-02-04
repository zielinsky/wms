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
      let warehouses: Warehouse[] = [];
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
      let warehouseItems: WarehouseItem[] = [];
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

  async getWarehousesWithItems() {
    try {
      const warehousesRef = db.collection("warehouses");
      let warehouses: Warehouse[] = [];
      await warehousesRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          let warehouse = warehouseConverter.fromFirestore(doc);
          warehouses.push(warehouse);
        });
      });

      for (let warehouse of warehouses) {
        warehouse.items = await this.getWarehouseItems(warehouse.id);
      }

      return warehouses;
    } catch (error) {
      console.log(error);
    }
  }

  async updateWarehouseItemAmmount(
    warehouseId: string,
    itemId: string,
    amount: number
  ) {
    const itemRef = db
      .collection("warehouses/" + warehouseId + "/items")
      .doc(itemId);
    await itemRef.update({
      amount: amount,
    });
  }
}

//export the class
export const warehouseServices = new warehouseService();
