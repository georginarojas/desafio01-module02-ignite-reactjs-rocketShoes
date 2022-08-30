import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";
import { CartState } from "./cartSlice";

const reducers = {
  setCart: (state: CartState, action: PayloadAction<Product[] | []>) => {
    localStorage.setItem("@RocketShoes:cart", JSON.stringify(action.payload));
    state.data = action.payload;
  },
  getCart: (state: CartState) => {
    const storageCart = localStorage.getItem("@RocketShoes:cart");
    state.data = storageCart ? JSON.parse(storageCart) : [];
  },
};
export default reducers;
