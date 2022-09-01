import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Product } from "../../types";
import { addNewItem, FetchCartError, updateProductAmount } from "./fetchCart";
import reducers from "./reducers";

export interface CartState {
  data: Product[] | [];
  isLoadingCart: boolean
  errorCart: string | null
}

const initialState: CartState = {
  data: [],
  isLoadingCart: false,
  errorCart: null
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: reducers,
  extraReducers : (builder) => {
    // AddNewProduct
    builder.addCase(addNewItem.pending, (state) => {
      state.isLoadingCart = true;
    })
    builder.addCase(addNewItem.fulfilled, (state, {payload}) => {
      state.isLoadingCart = false;
      state.data = payload;
    })
    builder.addCase(addNewItem.rejected, (state, {payload}) => {
      const action = payload as FetchCartError
      state.isLoadingCart = false
      state.errorCart = payload? action.message : state.errorCart
      toast.error(action.message);
    })
    // UpdateProductAmount
    builder.addCase(updateProductAmount.pending, (state) => {
      state.isLoadingCart = true;
    })
    builder.addCase(updateProductAmount.fulfilled, (state, {payload}) => {
      state.isLoadingCart = false;
      state.data = payload;
    })
    builder.addCase(updateProductAmount.rejected, (state, {payload}) => {
      const action = payload as FetchCartError
      state.isLoadingCart = false
      state.errorCart = payload? action.message : state.errorCart
      toast.error(action.message);
    })
},
});

export const { setCart, getCart } = cartSlice.actions;

export default cartSlice.reducer;
