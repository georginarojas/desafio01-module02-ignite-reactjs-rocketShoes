import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types";
import reducers from "./reducers";

export interface CartState {
  data: Product[];
}

const initialState: CartState = {
  data: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: reducers,
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
