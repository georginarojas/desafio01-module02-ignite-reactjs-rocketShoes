import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product, Stock } from "../../types";
import { getProductById, getStockById, updateAmount } from "./helper";

export type FetchCartError = {
  message: string;
};

export const addNewItem = createAsyncThunk<
  Product[],
  { productId: number; cart: Product[] },
  { rejectValue: FetchCartError }
>("cart/add", async (cartData, { rejectWithValue }) => {
  try {
    const { productId, cart } = cartData;
    const stock: Stock = await getStockById(productId);
    if (!stock) {
      throw new Error();
    }

    let newCart = [] as Product[];
    let cartProduct = cart.find((cart) => cart.id === productId);
    if (!cartProduct) {
      const product: Product = await getProductById(productId);
      if (!product) {
        throw new Error();
      }
      const newProductCart: Product = {
        ...product,
        amount: 1,
      };
      newCart = [...cart, newProductCart];
    } else {
      newCart = updateAmount({
        productId: productId,
        amount: cartProduct.amount + 1,
        stock,
        cart,
      });
    }
    return newCart;
  } catch (error: any) {
    return rejectWithValue({
      message: !!error.message ? error.message : "Erro na adição do produto",
    });
  }
});

// -- Updating list products of cart
export const updateProductAmount = createAsyncThunk<
  Product[],
  { productId: number; cart: Product[]; amount: number },
  { rejectValue: FetchCartError }
>("cart/update", async (cartData, { rejectWithValue }) => {
  try {
    const { productId, cart, amount } = cartData;
    const stock: Stock = await getStockById(productId);
    if (!stock) {
      throw new Error();
    }
    let newCart = [] as Product[];
    newCart = updateAmount({
      productId: productId,
      amount,
      stock,
      cart,
    });

    return newCart;
  } catch (error: any) {
    return rejectWithValue({
      message: !!error.message
        ? error.message
        : "Erro na alteração de quantidade do produto",
    });
  }
});
