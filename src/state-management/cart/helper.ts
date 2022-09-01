import { api } from "../../services/api";
import { Product, Stock } from "../../types";
// API Request
// -- Get products by ID
export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// -- Get stock by ID
export const getStockById = async (id: number): Promise<Stock> => {
  const response = await api.get(`/stock/${id}`);
  return response.data;
};
//------------

// Update amount product
type UpdateAmountType = {
  productId: number;
  amount: number;
  stock: Stock;
  cart: Product[];
};

export const updateAmount = ({
  productId,
  amount,
  stock,
  cart,
}: UpdateAmountType): Product[] => {
  if (amount > stock.amount) {
    throw new Error("Quantidade solicitada fora de estoque");
  }

  if (amount < 1) {
    throw new Error("Erro na alteração de quantidade do produto");
  }

  //   if (amount <= stock.amount) {
  const cartIndex = cart.findIndex((cart: Product) => cart.id === productId);
  const cartIdNewAmount = { ...cart[cartIndex], amount };
  let newCart = [...cart];
  newCart.splice(cartIndex, 1, cartIdNewAmount);
  //   }
  return newCart;
};
