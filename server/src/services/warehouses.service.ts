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

  async updateWarehouseItemAmount(
    warehouseId: string,
    itemId: string,
    amount: number
  ) {
    try {
      const itemRef = db
        .collection("warehouses/" + warehouseId + "/items")
        .doc(itemId);
      await itemRef.update({
        amount: amount,
      });
      return 1;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  async addWarehouseItemAmount(
    warehouseId: string,
    name: string,
    amount: number
  ) {
    try {
      let itemRef = await db
        .collection("warehouses/" + warehouseId + "/items")
        .add(
          warehouseItemConverter.toFirestore(
            new WarehouseItem("", name, amount)
          )
        );
      return itemRef.id;
    } catch (error) {
      console.log(error);
      return "-1";
    }
  }
}

//export the class
export const warehouseServices = new warehouseService();
