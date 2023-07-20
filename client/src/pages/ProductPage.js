import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "..";
import ColorList from "../components/ColorList";
import { fetchOneProduct } from "../http/productApi";
import { LS_BASKET, imagesUrl } from "../utils/constants";

function ProductPage() {
  const { propertiesStore, basketStore, toastStore } = useContext(Context);
  const [item, setItem] = useState({});
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetchOneProduct(id)
      .then((data) => {
        setItem(data);
        setSelectedColor(data.colors[0]);
      })
      .catch((error) => {});
  }, []);

  const getImageById = (id) => {
    const filteredColor = item.colors.filter((color) => color.id === id);
    return filteredColor[0];
  };

  const handleAddToCart = (e) => {
    const identificator = item.id + selectedColor.name;

    if (basketStore.items.some((item) => item.id === identificator)) {
      const items = JSON.parse(localStorage.getItem(LS_BASKET));

      const newItems = items.reduce((acc, curr) => {
        return curr.id === identificator
          ? [...acc, { ...curr, count: +curr.count + 1 }]
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
                product: item,
                color: selectedColor,
                count: 1,
              },
            ])
          )
        : localStorage.setItem(
            LS_BASKET,
            JSON.stringify([
              {
                id: identificator,
                product: item,
                color: selectedColor,
                count: 1,
              },
            ])
          );

      basketStore.setItem({
        id: identificator,
        product: item,
        color: selectedColor,
        count: 1,
      });
    }
    toastStore.setInfoToast("Товар добавлен в корзину");
  };


  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          {item.colors ? (
            <Image
              style={{ width: "100%" }}
              src={
                process.env.REACT_APP_API_URL + "/images/" + selectedColor.img
              }
            />
          ) : (
            <Image style={{ width: "100%" }} src={imagesUrl + "/ma.jpg"} />
          )}
        </Col>
        <Col md={8}>
          <h3>{item.name}</h3>
          {item.properties &&
            item.properties.map((info, index) => {
              const property = propertiesStore.getProperty(info.id);
              return (
                <Row
                  key={info.ProductProperty.id}
                  style={{
                    background: index % 2 === 0 ? "lightgray" : "transparent",
                    padding: 10,
                  }}
                >
                  {property.name}:{" "}
                  {info.ProductProperty.value
                    ? `${info.ProductProperty.value} ${property.currency}`
                    : `${info.ProductProperty.description} ${property.currency}`}
                </Row>
              );
            })}
          <Row className="p-2">
            <Card
              className="d-flex flex-column align-items-center justify-content-center"
              style={{
                width: 300,
                height: 330,
                fontSize: 32,
                border: "5px solid lightgray",
              }}
            >
              <h3>Цена: {item.price} руб.</h3>
              {selectedColor && <h5>Цвет: {selectedColor.name}</h5>}
              <div className="w-100 p-2">
                <ColorList
                  product={item}
                  changeColor={(e) => setSelectedColor(e)}
                />
              </div>
              <Button variant="outline-dark" onClick={() => handleAddToCart()}>
                Добавить в корзину
              </Button>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(ProductPage);
