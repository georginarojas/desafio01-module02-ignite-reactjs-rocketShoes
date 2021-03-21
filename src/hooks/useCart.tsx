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

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }
    return [];
  });

  // -- Get products by ID
  async function getProductById(id: number) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }

  // -- Get stock by ID
  async function getStockById(id: number) {
    const response = await api.get(`/stock/${id}`);
    return response.data;
  }

  // -- Set cart products
  function setCartProduct(product: Product[]) {
    setCart([...product]);
    localStorage.setItem("@RocketShoes:cart", JSON.stringify(product));
  }

  // --- Adding product to cart
  const addProduct = async (productId: number) => {
    try {
      const stock: Stock = await getStockById(productId);

      if (!stock) {
        throw new Error();
      }

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
        let newCart = [...cart, newProductCart];
        setCartProduct(newCart);
        return;
      } else {
        updateProductAmount({
          productId: productId,
          amount: cartProduct.amount + 1,
        });
      }
    } catch {
      toast.error("Erro na adição do produto");
    }
  };

  // -- Removing product from cart
  const removeProduct = (productId: number) => {
    try {
      let product = cart.find((cart) => cart.id === productId);
      if (!product) {
        throw new Error();
      }
      let newCart = cart.filter((product) => product.id !== productId);
      setCartProduct(newCart);
    } catch {
      toast.error("Erro na remoção do produto");
    }
  };

  // -- Updating list products of cart
  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      const stock = await getStockById(productId);

      if (!stock) {
        throw new Error();
      }

      if (amount > stock.amount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      if (amount < 1) {
        throw new Error();
      }

      if (amount <= stock.amount) {
        let cartIndex = cart.findIndex((cart) => cart.id === productId);
        cart[cartIndex].amount = amount;
        let newCart = [...cart];
        setCartProduct(newCart);
      }
    } catch {
      toast.error("Erro na alteração de quantidade do produto");
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
