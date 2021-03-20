import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
type StockFormat = Pick<Product, "id" | "amount">;

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
      const product = await getProduct(productId);
      const stock = await getStock(productId);

      const newProductCart: Product = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        amount: 1,
      };

      let cartProduct = cart.find((cart) => cart.id === productId);
      let cartIndex = cart.findIndex((cart) => cart.id === productId);


      // ** Conditions **
      if (cartProduct !== undefined) {
        if (stock.amount >= 1 && cart[cartIndex].amount <= stock.amount) {
          cart[cartIndex].amount += 1;
          setCart([...cart]);
        } else {
          toast.error("Quantidade solicitada fora de estoque");
        }
      } else {
        setCart([...cart, newProductCart]);
      }
      // localStorage.setItem("@RocketShoes:cart", JSON.stringify(cart));
    } catch {
      toast.error("Error na adição do produto");
    }
  };

  async function getProduct(id: number) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }

  async function getStock(id: number) {
    const response = await api.get(`/stock/${id}`);
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
