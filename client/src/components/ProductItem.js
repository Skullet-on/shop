import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Col, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { LS_BASKET, PRODUCT_ROUTE } from "../utils/constants";
import Badge from "./basic/Badge";
import ColorList from "./ColorList";

const ProductItem = ({ product }) => {
  const { basketStore, propertiesStore } = useContext(Context);
  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedColor(product.color[0]);
  }, []);

  console.log(product);

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
      <Card style={{ cursor: "pointer" }}>
        <Image
          src={
            selectedColor
              ? process.env.REACT_APP_API_URL + "/" + selectedColor.img
              : process.env.REACT_APP_API_URL + "/no-image.jpg"
          }
          style={{ objectFit: "cover", aspectRatio: "16 / 9" }}
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
            <b> {product.price} руб. </b>
            {count > 1 && `(${product.price * count} руб)`}
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
          {product.info.length
            ? product.info.map((property) => {
                const prop = propertiesStore.getProperty(property.propertyId);

                return (
                  <Card.Text key={property.id} className="d-flex mb-1">
                    {prop.name || ""}:
                    <div className="ms-2">
                      {prop.type === "string"
                        ? `${property.description} ${prop.currency}`
                        : `${property.value} ${prop.currency}`}
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
