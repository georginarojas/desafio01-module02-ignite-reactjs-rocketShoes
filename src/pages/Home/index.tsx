import { useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import { Loading, ProductList } from "./styles";
import { formatPrice } from "../../util/format";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state-management/store";
import { Product } from "../../types";
import { fetchProducts } from "../../state-management/products/fetchProducts";
import { getCart } from "../../state-management/cart/cartSlice";
import { addNewItem } from "../../state-management/cart/fetchCart";

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const dispatch = useDispatch<any>();
  const { data } = useSelector((state: RootState) => state.cart);
  const cartList = data as Product[];
  const { list, isLoading } = useSelector((state: RootState) => state.products);
  const products = list;

  const cartItemsAmount = cartList.reduce((sumAmount, product) => {
    let key = product.id;
    sumAmount[key] = product.amount;
    return sumAmount;
  }, {} as CartItemsAmount);

  useEffect(() => {
    // Using redux thunk
    dispatch(fetchProducts());
    dispatch(getCart());
  }, [dispatch]);

  function handleAddProduct(id: number) {
    // Using redux thunk
    dispatch(addNewItem({ productId: id, cart: cartList }));
  }

  return (
    <>
      {isLoading && <Loading>Carregando...</Loading>}
      <ProductList>
        {!isLoading &&
          products.map((product) => (
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
    </>
  );
};

export default Home;
