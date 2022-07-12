import React, { useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import ColorItem from "./ColorItem";
import CreateColor from "./modals/CreateColor";

const ColorList = ({ product }) => {
  const [colorVisible, setColorVisible] = useState(false);

  return (
    <Row>
      {product.color.map((color) => (
        <Col key={color.id} md={1}>
          <ColorItem color={color} />
        </Col>
      ))}
      <Col md={1}>
        <Card
          style={{ cursor: "pointer" }}
          onClick={() => setColorVisible(true)}
        >
          <Image src={process.env.REACT_APP_API_URL + "/plus.jpg"} />
        </Card>
      </Col>

      <CreateColor
        show={colorVisible}
        onHide={() => setColorVisible(false)}
        productId={product.id}
      />
    </Row>
  );
};

export default ColorList;
