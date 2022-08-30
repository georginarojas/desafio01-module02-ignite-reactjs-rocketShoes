import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state-management/store";
import { Product, Stock } from "../types";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { getCart, setCart } from "../state-management/cart/cartSlice";
import { useEffect } from "react";

export const useCartRedux = () => {
  const cart = useSelector((state: RootState) => state.cart.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])
  
  // API Request
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
        // updateProductAmount({
        //   productId: productId,
        //   amount: cartProduct.amount + 1,
        // });
      }
    } catch {
      toast.error("Erro na adição do produto");
    }
  };
  return {
    cart,
    addProduct
  };
};
