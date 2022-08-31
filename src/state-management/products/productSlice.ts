import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, Stock } from "../../types";
import { fetchProducts, FetchProductsError } from "./fetchProducts";

interface ProductState {
  list: Product[];
  stock: Stock[]
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  list: [],
  stock: [],
  isLoading: false,
  error: null
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[] | []>) => {
      state.list = action.payload;
    },
  },
  extraReducers : (builder) => {
      builder.addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      builder.addCase(fetchProducts.fulfilled, (state, {payload}) => {
        state.list = payload
        state.isLoading = false;
      })
      builder.addCase(fetchProducts.rejected, (state, {payload}) => {
        const action = payload as FetchProductsError
        state.isLoading = false
        state.error = payload? action.message : state.error
      })
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
