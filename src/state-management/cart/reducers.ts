import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";
import { CartState } from "./cartSlice";

const reducers = {
  setProducts: (state: CartState, action: PayloadAction<Product[] | []>) => {
    state.productList = action.payload;
  },
};
export default reducers;
