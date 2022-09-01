import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
  removeProduct: (state: CartState, action: PayloadAction<number>) => {
    let product = state.data.find((cart) => cart.id === action.payload);
    if (!product) {
      toast.error("Erro na remoção do produto");
      return;
    }
    let newCart = state.data.filter((product) => product.id !== action.payload);
    state.data = newCart;
  },
};
export default reducers;
