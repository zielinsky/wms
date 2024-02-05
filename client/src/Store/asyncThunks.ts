import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../API/axios";
import { WarehouseItemI } from "../Interfaces/Warehouse/warehouse";

export interface updateWarehouseItemAmountReq {
  warehouseId: string;
  itemId: string;
  currAmount: number;
  delta: number;
  userId: string;
}

export interface addWarehouseItemReq {
  warehouseId: string;
  name: string;
  amount: number;
  userId: string;
}

export interface deleteWarehouseItemReq {
  warehouseId: string;
  itemId: string;
  userId: string;
}

export interface addWarehouseItemResponse {
  warehouseId: string;
  warehouseItem: WarehouseItemI;
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get("/api/users");
  return response.data;
});

export const fetchWarehouses = createAsyncThunk(
  "warehouses/fetchWarehouses",
  async () => {
    const response = await client.get("/api/warehouses");
    return response.data;
  }
);

export const fetchWarehousesWithItems = createAsyncThunk(
  "warehouses/fetchWarehousesWithItems",
  async () => {
    const response = await client.get("/api/warehouses/items");
    return response.data;
  }
);

export const updateWarehouseItemAmount = createAsyncThunk(
  "warehouses/updateWarehouseItemAmount",
  async (reqData: updateWarehouseItemAmountReq) => {
    const { warehouseId, itemId, delta, userId } = reqData;
    const response = await client.put(
      `/api/warehouses/${warehouseId}/items/${itemId}`,
      {
        delta,
        userId,
      }
    );
    return reqData;
  }
);

export const addWarehouseItem = createAsyncThunk(
  "warehouses/addWarehouseItem",
  async (reqData: addWarehouseItemReq): Promise<addWarehouseItemResponse> => {
    const { warehouseId, name, amount, userId } = reqData;
    const response = await client.post(`/api/warehouses/${warehouseId}/items`, {
      name,
      amount,
      userId,
    });
    return {
      warehouseId: warehouseId,
      warehouseItem: { id: response.data.id, name: name, amount: amount },
    };
  }
);

export const deleteWarehouseItem = createAsyncThunk(
  "warehouses/deleteWarehouseItem",
  async (reqData: deleteWarehouseItemReq) => {
    const { warehouseId, itemId, userId } = reqData;
    const response = await client.delete(
      `/api/warehouses/${warehouseId}/items/${itemId}`,
      { data: { userId } }
    );
    return reqData;
  }
);
