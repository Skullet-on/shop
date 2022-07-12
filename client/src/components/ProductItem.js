import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/constants";

const ProductItem = ({ product, brand }) => {
  const imgIndex = 0;
  const navigate = useNavigate();

  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => navigate(PRODUCT_ROUTE + "/" + product.id)}
    >
      <Card className="p-2" style={{ cursor: "pointer" }} border={"light"}>
        <Image
          src={
            process.env.REACT_APP_API_URL + "/" + product.color[imgIndex].img
          }
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>{brand}</div>
        </div>
        <div>{product.name}</div>
        <b>{product.price} руб.</b>
      </Card>
    </Col>
  );
};

export default ProductItem;
