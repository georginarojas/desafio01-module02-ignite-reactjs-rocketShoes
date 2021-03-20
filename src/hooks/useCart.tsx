import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Product, Stock } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

type ProductFormat = Omit<Product, "amount">;

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      let productsList = await getProduct();
      let stockList = await getStock();

      let product = productsList.find(
        (product: ProductFormat) => product.id === productId
      );
      const stock = stockList.find((stock: Stock) => stock.id === productId);

      let newProductCart: Product = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        amount: 1,
      };

      if (stock.amount >= 1) {
        let cartProduct = cart.find((cart) => cart.id === product.id);
        let cartIndex = cart.findIndex((el) => el.id === product.id);
        if (cartProduct !== undefined) {
          cart[cartIndex].amount += 1;
          setCart([...cart]);
        } else {
          setCart([...cart, newProductCart]);
        }
        localStorage.setItem("@RocketShoes:cart", JSON.stringify(cart));
      } else {
        toast.error("Quantidade solicitada fora de estoque");
      }
    } catch {
      toast.error("Error na adição do produto");
    }
  };

  async function getProduct() {
    const response = await api.get("/products");
    return response.data;
  }

  async function getStock() {
    const response = await api.get("/stock");
    return response.data;
  }

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
