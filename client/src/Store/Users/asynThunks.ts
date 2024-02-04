import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../API/axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get("/api/users");
  return response.data;
});
