import { createSlice } from "@reduxjs/toolkit";
import { Product, Stock } from "../../types";
import reducers from "./reducers";

export interface CartState {
  productList: Product[];
  stockList: Stock[];
}

const initialState: CartState = {
  productList: [],
  stockList: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: reducers,
});

export const { setProducts } = cartSlice.actions;

export default cartSlice.reducer;
