import React from "react";
import { NavDropdown } from "react-bootstrap";

const NavBasketItem = ({ basketItem }) => {
  return (
    <NavDropdown.ItemText style={{ width: 300 }} key={basketItem.id}>
      {basketItem.product.name} (x{basketItem.count})
      <b>
        {Number(basketItem.product.price * basketItem.count).toFixed(2)}
        {" руб."}
      </b>
    </NavDropdown.ItemText>
  );
};

export default NavBasketItem;
