import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Badge, NavDropdown } from "react-bootstrap";
import { Cart2 } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { BASKET_ROUTE } from "../utils/constants";
import NavBasketItem from "./NavBasketItem";

const NavBasket = () => {
  const { basket } = useContext(Context);
  const navigate = useNavigate();

  return (
    <NavDropdown
      align="end"
      title={
        <>
          <Cart2 width="24" height="24" />
          <Badge
            pill
            bg="light"
            text="primary"
            style={{ position: "absolute", right: 10, top: 3 }}
          >
            {basket.items.length}
          </Badge>
        </>
      }
      id="header-basket"
    >
      {basket.items.map((basketItem) => (
        <NavBasketItem key={basketItem.product.id} basketItem={basketItem} />
      ))}
      <NavDropdown.Divider />
      <NavDropdown.ItemText>
        Сумма: <b>{basket.totalSum} руб.</b>
      </NavDropdown.ItemText>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={() => navigate(BASKET_ROUTE)}>
        Перейти в корзину
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default observer(NavBasket);
