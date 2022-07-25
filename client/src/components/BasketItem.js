import React from "react";
import { Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/constants";
import { X } from "react-bootstrap-icons";

const BasketItem = ({ item, basket }) => {
  const navigate = useNavigate();

  const handleSetCount = (value) => {
    if (value < 1) {
      basket.setCount(item.id, 1);

      localStorage.setItem("basket", JSON.stringify(basket.items));
    } else {
      basket.setCount(item.id, value);

      localStorage.setItem("basket", JSON.stringify(basket.items));
    }
  };

  const handleRemoveItem = (id) => {
    basket.removeItem(id);

    localStorage.setItem("basket", JSON.stringify(basket.items));
  };

  return (
    <tr>
      <td>
        <Image
          style={{ width: "100px" }}
          src={process.env.REACT_APP_API_URL + "/" + item.color.img}
        />
      </td>
      <td
        onClick={() => navigate(PRODUCT_ROUTE + "/" + item.product.id)}
        style={{ cursor: "pointer" }}
      >
        {item.product.name}
      </td>
      <td>{item.product.price} руб.</td>
      <td>
        <Form.Control
          type="number"
          placeholder="Количество"
          value={item.count}
          onChange={(e) => handleSetCount(e.target.value)}
        />
      </td>
      <td>{item.product.price * item.count} руб.</td>
      <td>
        <X
          width="24"
          height="24"
          onClick={() => handleRemoveItem(item.id)}
          style={{ cursor: "pointer" }}
        />
      </td>
    </tr>
  );
};

export default BasketItem;
