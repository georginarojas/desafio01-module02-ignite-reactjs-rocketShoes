import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

interface ProductState {
  data: Product[];
}

const initialState: ProductState = {
  data: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[] | []>) => {
      state.data = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
