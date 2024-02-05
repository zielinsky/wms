import {
  createEntityAdapter,
  createSelector,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { createAppSlice } from "../App/createAppSlice";
import { ActionType, LogI } from "../../Interfaces/Logs/log";
import { RootState } from "../App/store";
import { getAllLogs } from "../asyncThunks";

const logsAdapter = createEntityAdapter<LogI>();

export type filterType = "TAKE" | "PUT" | "ADD" | "DELETE" | "ALL";

export interface LogsSlicePartialState {
  status: "idle" | "loading" | "failed";
  filter: filterType;
}

const initialState = logsAdapter.getInitialState<LogsSlicePartialState>({
  status: "idle",
  filter: "ALL",
});

export const LogsSlice = createAppSlice({
  name: "logs",
  initialState,
  reducers: (create) => ({
    setFilter: create.reducer((state, action: PayloadAction<filterType>) => {
      state.filter = action.payload;
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(getAllLogs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        getAllLogs.fulfilled,
        (state, action: PayloadAction<Array<LogI>>) => {
          logsAdapter.addMany(state, action.payload);
          state.status = "idle";
        }
      );
  },

  selectors: {
    selectFilter: (state) => state.filter,
  },
});

export const { setFilter } = LogsSlice.actions;

export const { selectAll: selectLogs, selectById: selectLogById } =
  logsAdapter.getSelectors<RootState>((state) => state.logs);

export const { selectFilter } = LogsSlice.selectors;

export const selectFilteredLogs = createSelector(
  selectLogs,
  selectFilter,
  (logs, filter) => {
    if (filter !== "ALL") {
      return logs.filter((val) => val.type === (filter as ActionType));
    }
    return logs;
  }
);
