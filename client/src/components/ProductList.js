import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "../index";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const { productStore, brandStore } = useContext(Context);

  return (
    <Row className="d-flex me-2">
      {productStore.products.map((prod) => (
        <ProductItem
          key={prod.id}
          product={prod}
          brand={brandStore.getBrand(prod.brandId) ? brandStore.getBrand(prod.brandId).name : ""}
        />
      ))}
    </Row>
  );
};

export default observer(ProductList);
