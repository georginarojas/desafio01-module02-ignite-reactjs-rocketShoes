import { createSlice } from "@reduxjs/toolkit";
import { Stock } from "../../types";

interface StockState {
  data: Stock[];
}

const initialState: StockState = {
  data: [],
};

const stockSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const {} = stockSlice.actions;

export default stockSlice.reducer;
