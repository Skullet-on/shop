import React from "react";
import { Col, Row } from "react-bootstrap";
import ColorItem from "./ColorItem";

const ColorList = ({ product, changeColor }) => {
  return (
    <Row md={6} className="px-2 mt-2">
      {product.color.map((color) => (
        <Col
          key={color.id}
          className="p-0"
          onClick={(e) => changeColor(e, color)}
        >
          <ColorItem color={color} />
        </Col>
      ))}
    </Row>
  );
};

export default ColorList;
