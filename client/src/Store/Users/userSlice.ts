import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../App/createAppSlice";
import type { AppThunk } from "../App/store";
import User from "../../Interfaces/User/user";
import { fetchUsers } from "./asynThunks";

export interface UsersSliceState {
  users: Array<User>;
  status: "idle" | "loading" | "failed";
}

const initialState: UsersSliceState = {
  users: [],
  status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const usersSlice = createAppSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    addUser: create.reducer((state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    }),
    // // Use the `PayloadAction` type to declare the contents of `action.payload`
    // incrementByAmount: create.reducer(
    //   (state, action: PayloadAction<number>) => {
    //     state.value += action.payload;
    //   }
    // ),
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.

    // incrementAsync: create.asyncThunk(
    //   async (amount: number) => {
    //     const response = await fetchCount(amount);
    //     // The value we return becomes the `fulfilled` action payload
    //     return response.data;
    //   },
    //   {
    //     pending: (state) => {
    //       state.status = "loading";
    //     },
    //     fulfilled: (state, action) => {
    //       state.status = "idle";
    //       state.value += action.payload;
    //     },
    //     rejected: (state) => {
    //       state.status = "failed";
    //     },
    //   }
    // ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<Array<User>>) => {
          state.users = action.payload;
          state.status = "idle";
        }
      );
  },
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectUsers: (counter) => counter.users,
    selectStatus: (counter) => counter.status,
  },
});

// Action creators are generated for each case reducer function.
export const { addUser } = usersSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUsers, selectStatus } = usersSlice.selectors;

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());

//     if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };
