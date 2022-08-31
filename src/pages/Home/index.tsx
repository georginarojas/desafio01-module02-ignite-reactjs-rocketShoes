import { useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import { Loading, ProductList } from "./styles";
// import { api } from "../../services/api";
import { formatPrice } from "../../util/format";
import { useCartRedux } from "../../hooks";

import { useDispatch, useSelector } from "react-redux";
// import { setProducts } from "../../state-management/products/productSlice";
import { RootState } from "../../state-management/store";
import { Product } from "../../types";
import { fetchProducts } from "../../state-management/products/fetchProducts";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
// }

// interface ProductFormatted extends Product {
//   priceFormatted: string;
// }

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  // const [products, setProducts] = useState<ProductFormatted[]>([]);
  // const { addProduct, cart } = useCart();
  const { cart, addProduct } = useCartRedux();
  const cartList = cart as Product[];
  const dispatch = useDispatch<any>();
  const { list, isLoading } = useSelector((state: RootState) => state.products);
  const products = list;

  const cartItemsAmount = cartList.reduce((sumAmount, product) => {
    // const cartItemsAmount = cart.reduce((sumAmount, product) => {
    let key = product.id;
    sumAmount[key] = product.amount;
    return sumAmount;
  }, {} as CartItemsAmount);

  useEffect(() => {
    // async function loadProducts() {
    //   const response = await api.get("/products");
    //   // setProducts([...response.data]);

    //   // Using redux
    //   dispatch(setProducts(response.data));
    // }

    // loadProducts();

    // Using redux thunk
    dispatch(fetchProducts());
  }, [dispatch]);

  function handleAddProduct(id: number) {
    addProduct(id);
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
