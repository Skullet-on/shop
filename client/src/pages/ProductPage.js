import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "..";
import { fetchOneProduct, fetchProperties } from "../http/productApi";

function ProductPage() {
  const { productStore } = useContext(Context);
  const [item, setItem] = useState({ info: [] });
  const imgIndex = 0;
  const { id } = useParams();

  useEffect(() => {
    fetchOneProduct(id).then((data) => setItem(data));
    fetchProperties().then((data) => productStore.setProperties(data));
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          {item.color ? (
            <Image
              style={{ width: "100%" }}
              src={
                process.env.REACT_APP_API_URL + "/" + item.color[imgIndex].img
              }
            />
          ) : (
            <Image
              style={{ width: "100%" }}
              src={process.env.REACT_APP_API_URL + "/no-image.jpg"}
            />
          )}
          <h3>{item.name}</h3>
        </Col>
        <Col md={8}>
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
            <Button variant="outline-dark">Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row>
        <h1>Описание</h1>
        {item.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {console.log(info)}
            {productStore.getProperty(info.propertyId).name}:{" "}
            {info.value ? info.value : info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
}

export default observer(ProductPage);
