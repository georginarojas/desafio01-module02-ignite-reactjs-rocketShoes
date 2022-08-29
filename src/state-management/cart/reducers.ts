import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";
import { CartState } from "./cartSlice";

const reducers = {
  setCart: (state: CartState, action: PayloadAction<Product[] | []>) => {
    state.data = action.payload;
  },
};
export default reducers;
