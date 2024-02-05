import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../API/axios";

export interface updateWarehouseItemAmountReq {
  warehouseId: string;
  itemId: string;
  amount: number;
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
    const { warehouseId, itemId, amount } = reqData;
    const response = await client.put(`/api/warehouses/${warehouseId}/amount`, {
      itemId,
      amount,
    });
    return reqData;
  }
);
