import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import CatalogItem from "./CatalogItem";

const CatalogList = () => {
  const { product } = useContext(Context);

  return (
    <Container>
      {product.catalogs.map((catalog, index) => (
        <CatalogItem key={index} catalog={catalog} />
      ))}
    </Container>
  );
};

export default observer(CatalogList);
