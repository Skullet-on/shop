import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Badge, NavDropdown } from "react-bootstrap";
import { Cart2 } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { BASKET_ROUTE } from "../utils/constants";
import NavBasketItem from "./NavBasketItem";

const NavBasket = () => {
  const { basketStore } = useContext(Context);
  const navigate = useNavigate();

  return (
    <NavDropdown
      align="end"
      title={
        basketStore.items.length ?
        <>
          <Cart2 width="24" height="24" />
          <Badge
            pill
            bg="danger"
            text="light"
            style={{ position: "absolute", right: 10, top: 3 }}
          >
            {basketStore.items.length}
          </Badge>
        </>
        : <Cart2 width="24" height="24" />
      }
      id="header-basket"
    >
      {basketStore.items.map((basketItem) => (
        <NavBasketItem key={basketItem.product.id} basketItem={basketItem} />
      ))}
      <NavDropdown.Divider />
      <NavDropdown.ItemText>
        Сумма: <b>{Number(basketStore.totalSum).toFixed(2)} руб.</b>
      </NavDropdown.ItemText>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={() => navigate(BASKET_ROUTE)}>
        Перейти в корзину
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default observer(NavBasket);
