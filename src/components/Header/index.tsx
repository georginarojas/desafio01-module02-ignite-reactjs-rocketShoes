import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";

import logo from "../../assets/images/logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../state-management/store";
import { Container, Cart } from "./styles";
import Loader from "../Loader";

const Header = (): JSX.Element => {
  const cart = useSelector((state: RootState) => state.cart.data);
  const isLoading = useSelector((state: RootState) => state.cart.isLoadingCart);

  const cartSize = cart.length;

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <strong>Meu carrinho</strong>
              <span data-testid="cart-size">
                {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
              </span>
            </>
          )}
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
};

export default Header;
