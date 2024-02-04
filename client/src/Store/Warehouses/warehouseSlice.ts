import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../App/createAppSlice";
import type { AppThunk } from "../App/store";
import User from "../../Interfaces/User/user";
import { Warehouse } from "../../Interfaces/Warehouse/warehouse";
import { fetchWarehouses, fetchWarehousesWithItems } from "../asyncThunks";

export interface UsersSliceState {
  warehouses: Array<Warehouse>;
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
        (state, action: PayloadAction<Array<Warehouse>>) => {
          state.warehouses = action.payload;
          state.status = "idle";
        }
      )
      .addCase(fetchWarehousesWithItems.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        fetchWarehousesWithItems.fulfilled,
        (state, action: PayloadAction<Array<Warehouse>>) => {
          state.warehouses = action.payload;
          state.status = "idle";
        }
      );
  },

  selectors: {
    selectWarehouses: (state) => state.warehouses,
    selectStatus: (state) => state.status,
  },
});

export const {} = warehousesSlice.actions;

export const { selectWarehouses, selectStatus } = warehousesSlice.selectors;
