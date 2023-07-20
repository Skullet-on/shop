import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ColorItem from "./ColorItem";

const ColorList = ({ product, changeColor }) => {
  return (
    <div className="d-flex px-2 mt-2">
      {product.colors &&
        product.colors.map((color) => (
          <div
            key={color.id}
            className="p-0"
            style={{ height: 25, width: 25 }}
            onClick={() => changeColor(color)}
          >
            <ColorItem color={color} />
          </div>
        ))}
    </div>
  );
};

export default ColorList;
