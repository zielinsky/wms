import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../App/createAppSlice";
import type { AppThunk } from "../App/store";
import User from "../../Interfaces/User/user";
import { WarehouseI } from "../../Interfaces/Warehouse/warehouse";
import {
  fetchWarehouses,
  fetchWarehousesWithItems,
  updateWarehouseItemAmount,
} from "../asyncThunks";

export interface UsersSliceState {
  warehouses: Array<WarehouseI>;
  status: "idle" | "loading" | "failed";
}

const initialState: UsersSliceState = {
  warehouses: [],
  status: "idle",
};

export const warehousesSlice = createAppSlice({
  name: "warehouses",
  initialState,
  reducers: (create) => ({}),
  extraReducers: (builder) => {
    builder
      .addCase(fetchWarehouses.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        fetchWarehouses.fulfilled,
        (state, action: PayloadAction<Array<WarehouseI>>) => {
          state.warehouses = action.payload;
          state.status = "idle";
        }
      )
      .addCase(fetchWarehousesWithItems.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        fetchWarehousesWithItems.fulfilled,
        (state, action: PayloadAction<Array<WarehouseI>>) => {
          state.warehouses = action.payload;
          state.status = "idle";
        }
      )
      .addCase(updateWarehouseItemAmount.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(updateWarehouseItemAmount.fulfilled, (state, action) => {
        state.status = "idle";
        const idx = state.warehouses.findIndex(
          (val, _) => val.id == action.payload.itemId
        );
        state.warehouses[idx] = state.warehouses[idx];
      });
  },

  selectors: {
    selectWarehouses: (state) => state.warehouses,
    selectStatus: (state) => state.status,
  },
});

export const {} = warehousesSlice.actions;

export const { selectWarehouses, selectStatus } = warehousesSlice.selectors;
