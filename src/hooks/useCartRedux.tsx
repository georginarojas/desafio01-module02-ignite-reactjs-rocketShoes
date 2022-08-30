import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state-management/store";
import { Product, Stock } from "../types";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { getCart, setCart } from "../state-management/cart/cartSlice";

type UpdateProductAmount = {
  productId: number;
  amount: number;
  stockSending?: Stock;
};

export const useCartRedux = () => {
  const cart = useSelector((state: RootState) => state.cart.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // API Request
  // -- Get products by ID
  const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  };

  // -- Get stock by ID
  const getStockById = async (id: number): Promise<Stock> => {
    const response = await api.get(`/stock/${id}`);
    return response.data;
  };
  //------------

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
        dispatch(setCart(newCart));
        return;
      } else {
        updateProductAmount({
          productId: productId,
          amount: cartProduct.amount + 1,
          stockSending: stock,
        });
      }
    } catch {
      toast.error("Erro na adição do produto");
    }
  };

  // -- Updating list products of cart
  const updateProductAmount = async ({
    productId,
    amount,
    stockSending,
  }: UpdateProductAmount) => {
    try {
      const stock = stockSending ? stockSending : await getStockById(productId);

      if (!stock) {
        throw new Error();
      }

      if (amount > stock.amount) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      if (amount < 1) {
        throw new Error();
      }

      if (amount <= stock.amount) {
        const cartIndex = cart.findIndex((cart) => cart.id === productId);
        const cartIdNewAmount = { ...cart[cartIndex], amount };
        let newCart = [...cart];
        newCart.splice(cartIndex, 1, cartIdNewAmount);
        dispatch(setCart(newCart));
      }
    } catch {
      toast.error("Erro na alteração de quantidade do produto");
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
      dispatch(setCart(newCart));
    } catch {
      toast.error("Erro na remoção do produto");
    }
  };
  return {
    cart,
    addProduct,
    updateProductAmount,
    removeProduct,
  };
};
