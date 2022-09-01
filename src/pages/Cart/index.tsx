import React from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../state-management/cart/cartSlice";
import { updateProductAmount } from "../../state-management/cart/fetchCart";
import { RootState } from "../../state-management/store";
import { Product } from "../../types";

import { formatPrice } from "../../util/format";
import { Container, ProductTable, Total } from "./styles";

const Cart = (): JSX.Element => {
  const dispatch = useDispatch<any>();
  const { data } = useSelector((state: RootState) => state.cart);

  const cartList = data as Product[];

  const cartFormatted = cartList.map((product: Product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount),
  }));

  const total = formatPrice(
    cartList.reduce((sumTotal, product) => {
      let subTotal = product.amount * product.price;
      return (sumTotal += subTotal);
    }, 0)
  );

  function handleProductIncrement(product: Product) {
    dispatch(
      updateProductAmount({
        productId: product.id,
        amount: product.amount + 1,
        cart: cartList,
      })
    );
  }

  function handleProductDecrement(product: Product) {
    dispatch(
      updateProductAmount({
        productId: product.id,
        amount: product.amount - 1,
        cart: cartList,
      })
    );
  }

  function handleRemoveProduct(productId: number) {
   dispatch(removeProduct(productId));
  }
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted.map((product) => (
            <tr key={product.id} data-testid="product">
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product"
                    disabled={product.amount <= 1}
                    onClick={() => handleProductDecrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={product.amount}
                  />
                  <button
                    type="button"
                    data-testid="increment-product"
                    onClick={() => handleProductIncrement(product)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
