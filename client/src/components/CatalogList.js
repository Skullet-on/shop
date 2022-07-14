import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import { fetchCatalogs, removeCatalogProperty } from "../http/productApi";
import CatalogItem from "./CatalogItem";

const CatalogList = () => {
  const { product } = useContext(Context);

  const removeProperty = (catalogId, propertyId) => {
    removeCatalogProperty(catalogId, propertyId).then(() =>
      fetchCatalogs().then((data) => product.setCatalogs(data))
    );
  };

  return (
    <Container>
      {product.catalogs.map((catalog, index) => (
        <CatalogItem
          key={index}
          catalog={catalog}
          removeProperty={removeProperty}
        />
      ))}
    </Container>
  );
};

export default observer(CatalogList);
