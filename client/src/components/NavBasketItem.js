import React from "react";
import { NavDropdown } from "react-bootstrap";

const NavBasketItem = ({ basketItem }) => {
  return (
    <NavDropdown.ItemText style={{ width: 300 }} key={basketItem.id}>
      {basketItem.product.name} (x{basketItem.count})
      <b>
        {basketItem.product.price * basketItem.count}
        {" руб."}
      </b>
    </NavDropdown.ItemText>
  );
};

export default NavBasketItem;
