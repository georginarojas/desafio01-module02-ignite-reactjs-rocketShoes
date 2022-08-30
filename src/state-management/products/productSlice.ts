import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, Stock } from "../../types";

interface ProductState {
  list: Product[];
  stock: Stock[]
}

const initialState: ProductState = {
  list: [],
  stock: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[] | []>) => {
      state.list = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
