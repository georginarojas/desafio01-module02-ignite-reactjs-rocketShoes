import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../cart/cartSlice";
import productsReducer from '../products/productSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
