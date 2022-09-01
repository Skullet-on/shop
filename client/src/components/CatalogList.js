import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import {
  fetchCatalogs,
  removeCatalog,
  removeCatalogProperty,
} from "../http/productApi";
import CatalogItem from "./CatalogItem";

const CatalogList = () => {
  const { catalogStore } = useContext(Context);

  const removeProperty = (catalogId, propertyId) => {
    removeCatalogProperty(catalogId, propertyId).then(() =>
      fetchCatalogs().then((data) => catalogStore.setCatalogs(data))
    );
  };

  const handleRemoveCatalog = (catalogId) => {
    removeCatalog(catalogId).then(() =>
      fetchCatalogs().then((data) => catalogStore.setCatalogs(data))
    );
  };

  return (
    <Container>
      {catalogStore.catalogs.map((catalog, index) => (
        <CatalogItem
          key={index}
          catalog={catalog}
          removeProperty={removeProperty}
          removeCatalog={handleRemoveCatalog}
        />
      ))}
    </Container>
  );
};

export default observer(CatalogList);
