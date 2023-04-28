import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Col, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { imagesUrl, LS_BASKET, PRODUCT_ROUTE } from "../utils/constants";
import Badge from "./basic/Badge";
import ColorList from "./ColorList";

const ProductItem = ({ product }) => {
  const { basketStore } = useContext(Context);
  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedColor(product.colors[0]);
  }, []);

  const handleSetCount = (e) => {
    if (e.target.value < 1) {
      setCount(1);
    } else {
      setCount(e.target.value);
    }
  };

  const handleAddToCart = (e) => {
    const identificator = product.id + selectedColor.name;

    if (basketStore.items.some((item) => item.id === identificator)) {
      const items = JSON.parse(localStorage.getItem(LS_BASKET));

      const newItems = items.reduce((acc, curr) => {
        return curr.id === identificator
          ? [...acc, { ...curr, count: +curr.count + +count }]
          : [...acc, { ...curr }];
      }, []);
      localStorage.setItem(LS_BASKET, JSON.stringify(newItems));

      basketStore.setItems(newItems);
    } else {
      const items = localStorage.getItem(LS_BASKET);

      items
        ? localStorage.setItem(
            LS_BASKET,
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
            LS_BASKET,
            JSON.stringify([
              {
                id: identificator,
                product: product,
                color: selectedColor,
                count: count,
              },
            ])
          );

      basketStore.setItem({
        id: identificator,
        product: product,
        color: selectedColor,
        count: count,
      });
    }
  };

  const handleChangeColor = (color) => {
    setSelectedColor(color);
  };

  return (
    <Col sm={12} md={6} xl={4} xxl={3} className="mt-3 p-1">
      <Card>
        <Image
          src={
            selectedColor
              ? imagesUrl + "/" + selectedColor.img
              : imagesUrl + "/no-image.jpg"
          }
          onClick={() => navigate(PRODUCT_ROUTE + "/" + product.id)}
          style={{
            objectFit: "cover",
            aspectRatio: "16 / 9",
            cursor: "pointer",
          }}
        />
        <Card.Body>
          <Card.Title
            className="fs-6"
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </Card.Title>
          <Card.Text className="mb-1">
            Цена:
            {product.oldPrice ? <s> {product.oldPrice} руб.</s> : ""}
            <b> {product.price} руб. </b>
          </Card.Text>
          <Card.Text className="mb-1">
            {selectedColor && selectedColor.count > 0 ? (
              <Badge type="dot" bg="success">
                В наличии
              </Badge>
            ) : (
              <Badge type="dot" bg="warning">
                Под заказ
              </Badge>
            )}
          </Card.Text>
          {product.properties.length
            ? product.properties.map((property) => {
                return (
                  <Card.Text key={property.id} className="d-flex mb-1">
                    {property.name || ""}:
                    <div className="ms-2">
                      {property.type === "string"
                        ? `${property.ProductProperty.description} ${property.currency}`
                        : `${property.ProductProperty.value} ${property.currency}`}
                    </div>
                  </Card.Text>
                );
              })
            : ""}
          <ColorList product={product} changeColor={handleChangeColor} />
        </Card.Body>
        <ButtonGroup aria-label="Basic example">
          <Form.Control
            type="number"
            placeholder="Количество"
            value={count}
            onChange={(e) => handleSetCount(e)}
            onClick={(e) => e.stopPropagation()}
          />
          <Button size="sm" variant="primary" onClick={handleAddToCart}>
            Купить
          </Button>
        </ButtonGroup>
      </Card>
    </Col>
  );
};

export default observer(ProductItem);
