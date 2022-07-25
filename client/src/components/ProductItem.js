import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { PRODUCT_ROUTE } from "../utils/constants";
import ColorList from "./ColorList";

const ProductItem = ({ product, brand }) => {
  const { basket } = useContext(Context);
  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedColor(product.color[0]);
  }, []);

  const handleSetCount = (e) => {
    e.stopPropagation();

    if (e.target.value < 1) {
      setCount(1);
    } else {
      setCount(e.target.value);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    const identificator = product.id + selectedColor.name;

    if (basket.items.some((item) => item.id === identificator)) {
      const items = JSON.parse(localStorage.getItem("basket"));

      const newItems = items.reduce((acc, curr) => {
        return curr.id === identificator
          ? [...acc, { ...curr, count: +curr.count + +count }]
          : [...acc, { ...curr }];
      }, []);
      localStorage.setItem("basket", JSON.stringify(newItems));

      basket.setItems(newItems);
    } else {
      const items = localStorage.getItem("basket");

      items
        ? localStorage.setItem(
            "basket",
            JSON.stringify([
              ...JSON.parse(items),
              {
                id: identificator,
                product: product,
                color: selectedColor,
                count: count,
              },
            ])
          )
        : localStorage.setItem(
            "basket",
            JSON.stringify([
              {
                id: identificator,
                product: product,
                color: selectedColor,
                count: count,
              },
            ])
          );

      basket.setItem({
        id: identificator,
        product: product,
        color: selectedColor,
        count: count,
      });
    }
  };

  const handleChangeColor = (e, color) => {
    e.stopPropagation();

    setSelectedColor(color);
  };

  return (
    <Col
      md={3}
      className="mt-3 p-1"
      onClick={() => navigate(PRODUCT_ROUTE + "/" + product.id)}
    >
      <Card style={{ cursor: "pointer" }} border={"dark"}>
        <Image
          src={
            selectedColor
              ? process.env.REACT_APP_API_URL + "/" + selectedColor.img
              : process.env.REACT_APP_API_URL + "/no-image.jpg"
          }
          style={{ objectFit: "cover", aspectRatio: "16 / 9" }}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text className="mb-1">
            Цена:
            <b> {product.price} руб. </b>
            {count > 1 && `(${product.price * count} руб)`}
          </Card.Text>
          Количество:{" "}
          <Form.Control
            type="number"
            placeholder="Количество"
            value={count}
            onChange={(e) => handleSetCount(e)}
            onClick={(e) => e.stopPropagation()}
          />
          <ColorList product={product} changeColor={handleChangeColor} />
        </Card.Body>
        <Button variant="primary" onClick={handleAddToCart}>
          Добавить в корзину
        </Button>
        <Button variant="primary" onClick={handleAddToCart}>
          Купить в 1 клик
        </Button>
      </Card>
    </Col>
  );
};

export default observer(ProductItem);
