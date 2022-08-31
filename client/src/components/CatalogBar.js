import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";

const CatalogBar = observer(() => {
  const { productStore } = useContext(Context);

  const handleChangeCatalog = (catalog) => {
    if (catalog.id === productStore.selectedCatalog.id) {
      productStore.setSelectedCatalog({});
    } else {
      productStore.setSelectedCatalog(catalog);
    }
  };

  return (
    <ListGroup>
      {productStore.catalogs.map((catalog) => (
        <ListGroup.Item
          key={catalog.id}
          style={{ cursor: "pointer" }}
          active={catalog.id === productStore.selectedCatalog.id}
          onClick={() => handleChangeCatalog(catalog)}
        >
          {catalog.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default CatalogBar;
