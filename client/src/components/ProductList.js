import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "../index";
import ProductItem from "./ProductItem";

const ProductList = observer(() => {
  const { product } = useContext(Context);

  return (
    <Row className="d-flex">
      {product.products.map((prod) => (
        <ProductItem
          key={prod.id}
          product={prod}
          brand={product.getBrand(prod.brandId).name}
        />
      ))}
    </Row>
  );
});

export default ProductList;
