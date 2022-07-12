import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";

const CatalogBar = observer(() => {
  const { product } = useContext(Context);

  const handleChangeCatalog = (catalog) => {
    if (catalog.id === product.selectedCatalog.id) {
      product.setSelectedCatalog({});
    } else {
      product.setSelectedCatalog(catalog);
    }
  };

  return (
    <ListGroup>
      {product.catalogs.map((catalog) => (
        <ListGroup.Item
          key={catalog.id}
          style={{ cursor: "pointer" }}
          active={catalog.id === product.selectedCatalog.id}
          onClick={() => handleChangeCatalog(catalog)}
        >
          {catalog.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default CatalogBar;
