import { useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { ProductList } from "./styles";
import { api } from "../../services/api";
import { formatPrice } from "../../util/format";
import { useCartRedux } from "../../hooks";

import {setProducts} from '../../state-management/products/productSlice'
import { RootState } from "../../state-management/store";
import { Product } from "../../types";


interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const { cart , addProduct } = useCartRedux()
  const cartList = cart as Product[]
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products.list) as Product[];

    const cartItemsAmount = cartList.reduce((sumAmount, product) => {
      let key = product.id;
      sumAmount[key] = product.amount;
      return sumAmount;
    }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/products");
      dispatch(setProducts(response.data))
    }

    loadProducts();
  }, [dispatch]);

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{formatPrice(product.price)}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(product.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
               {cartItemsAmount[product.id] || 0} 
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

export default Home;
