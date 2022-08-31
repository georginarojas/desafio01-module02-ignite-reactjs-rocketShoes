import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { Product } from "../../types";

export type FetchProductsError = {
  message: string;
};

export const fetchProducts = createAsyncThunk<
  Product[]
>("products/fetch", async (_, thunkApi) => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: "Error em carregar os items",
    });
  }
});
