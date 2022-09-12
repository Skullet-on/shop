import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "..";
import ColorList from "../components/ColorList";
import { fetchOneProduct } from "../http/productApi";
import { imagesUrl } from "../utils/constants";

function ProductPage() {
  const { propertiesStore } = useContext(Context);
  const [item, setItem] = useState({});
  const imgIndex = 0;
  const { id } = useParams();

  useEffect(() => {
    fetchOneProduct(id)
      .then((data) => {
        setItem(data);
      })
      .catch((error) => {});
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
            <Image style={{ width: "100%" }} src={imagesUrl + "/ma.jpg"} />
          )}
        </Col>
        <Col md={8}>
          <h3>{item.name}</h3>
          {item.info &&
            item.info.map((info, index) => {
              const property = propertiesStore.getProperty(info.propertyId);
              return (
                <Row
                  key={info.id}
                  style={{
                    background: index % 2 === 0 ? "lightgray" : "transparent",
                    padding: 10,
                  }}
                >
                  {property.name}:{" "}
                  {info.value
                    ? `${info.value} ${property.currency}`
                    : `${info.description} ${property.currency}`}
                </Row>
              );
            })}
        </Col>
      </Row>
      <Row>
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
          <ColorList product={item} changeColor={() => {}} />
          <Button variant="outline-dark">Добавить в корзину</Button>
        </Card>
      </Row>
    </Container>
  );
}

export default observer(ProductPage);
