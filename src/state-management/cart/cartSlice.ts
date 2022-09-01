import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Product } from "../../types";
import { addNewItem, FetchCartError, updateProductAmount } from "./fetchCart";

export interface CartState {
  data: Product[] | [];
  isLoadingCart: boolean;
  errorCart: string | null;
}

const initialState: CartState = {
  data: [],
  isLoadingCart: false,
  errorCart: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
      let newCart = state.data.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(newCart));
      state.data = newCart;
    },
  },
  extraReducers: (builder) => {
    // AddNewProduct
    builder.addCase(addNewItem.pending, (state) => {
      state.isLoadingCart = true;
    });
    builder.addCase(addNewItem.fulfilled, (state, { payload }) => {
      state.isLoadingCart = false;
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(payload));
      state.data = payload;
    });
    builder.addCase(addNewItem.rejected, (state, { payload }) => {
      const action = payload as FetchCartError;
      state.isLoadingCart = false;
      state.errorCart = payload ? action.message : state.errorCart;
      toast.error(action.message);
    });
    // UpdateProductAmount
    builder.addCase(updateProductAmount.pending, (state) => {
      state.isLoadingCart = true;
    });
    builder.addCase(updateProductAmount.fulfilled, (state, { payload }) => {
      state.isLoadingCart = false;
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(payload));
      state.data = payload;
    });
    builder.addCase(updateProductAmount.rejected, (state, { payload }) => {
      const action = payload as FetchCartError;
      state.isLoadingCart = false;
      state.errorCart = payload ? action.message : state.errorCart;
      toast.error(action.message);
    });
  },
});

export const { removeProduct, getCart } = cartSlice.actions;

export default cartSlice.reducer;
