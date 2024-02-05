import {
  createEntityAdapter,
  Draft,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { createAppSlice } from "../App/createAppSlice";
import { RootState, type AppThunk } from "../App/store";
import {
  WarehouseI,
  WarehouseItemI,
} from "../../Interfaces/Warehouse/warehouse";
import {
  addWarehouseItem,
  deleteWarehouseItem,
  fetchWarehouses,
  fetchWarehousesWithItems,
  updateWarehouseItemAmount,
} from "../asyncThunks";

const warehouseAdapter = createEntityAdapter<WarehouseI>();
interface warehouseSlicePartialState {
  status: "idle" | "loading" | "failed";
}

const initialState =
  warehouseAdapter.getInitialState<warehouseSlicePartialState>({
    status: "idle",
  });

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
          warehouseAdapter.addMany(state, action.payload);
          state.status = "idle";
        }
      )
      .addCase(fetchWarehousesWithItems.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        fetchWarehousesWithItems.fulfilled,
        (state, action: PayloadAction<Array<WarehouseI>>) => {
          warehouseAdapter.addMany(state, action.payload);
          state.status = "idle";
        }
      )
      .addCase(updateWarehouseItemAmount.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(updateWarehouseItemAmount.fulfilled, (state, action) => {
        state.status = "idle";
        const items: Draft<WarehouseItemI>[] | undefined =
          state.entities[action.payload.warehouseId].items!;
        const idx = items!.findIndex((val) => val.id === action.payload.itemId);
        const warehouseItem = items[idx];
        items[idx] = {
          id: warehouseItem.id,
          name: warehouseItem.name,
          amount: action.payload.currAmount + action.payload.delta,
        };
        warehouseAdapter.updateOne(state, {
          id: action.payload.warehouseId,
          changes: { items: items },
        });
      })
      .addCase(addWarehouseItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addWarehouseItem.fulfilled, (state, action) => {
        // warehouseAdapter.addOne(state, action.payload);
        state.entities[action.payload.warehouseId].items!.push(
          action.payload.warehouseItem
        );
        warehouseAdapter.updateOne(state, {
          id: action.payload.warehouseId,
          changes: { items: state.entities[action.payload.warehouseId].items! },
        });
        state.status = "idle";
      })
      .addCase(deleteWarehouseItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteWarehouseItem.fulfilled, (state, action) => {
        const items = state.entities[action.payload.warehouseId].items!;
        items.splice(
          items.findIndex((val) => val.id === action.payload.itemId),
          1
        );
        warehouseAdapter.updateOne(state, {
          id: action.payload.warehouseId,
          changes: { items: items },
        });
        state.status = "idle";
      });
  },

  selectors: {
    selectStatus: (state) => state.status,
  },
});

export const { selectAll: selectWarehouses } =
  warehouseAdapter.getSelectors<RootState>((state) => state.warehouses);

export const { selectStatus } = warehousesSlice.selectors;
