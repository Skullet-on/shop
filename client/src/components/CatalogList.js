import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import {
  editCatalog,
  fetchCatalogs,
  removeCatalog,
  removeCatalogProperty,
} from "../http/productApi";
import CatalogItem from "./CatalogItem";

const CatalogList = () => {
  const { product } = useContext(Context);

  const removeProperty = (catalogId, propertyId) => {
    removeCatalogProperty(catalogId, propertyId).then(() =>
      fetchCatalogs().then((data) => product.setCatalogs(data))
    );
  };

  const handleRemoveCatalog = (catalogId) => {
    removeCatalog(catalogId).then(() =>
      fetchCatalogs().then((data) => product.setCatalogs(data))
    );
  };

  const handleEditCatalog = (catalogId, catalogName) => {
    editCatalog(catalogId, catalogName).then(() =>
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
          removeCatalog={handleRemoveCatalog}
          editCatalog={handleEditCatalog}
        />
      ))}
    </Container>
  );
};

export default observer(CatalogList);
