import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";

const CatalogBar = observer(() => {
  const { catalogStore } = useContext(Context);

  const handleChangeCatalog = (catalog) => {
    if (catalog.id === catalogStore.selectedCatalog.id) {
      catalogStore.setSelectedCatalog({});
    } else {
      catalogStore.setSelectedCatalog(catalog);
    }
  };

  return (
    <ListGroup>
      {catalogStore.catalogs.map((catalog) => (
        <ListGroup.Item
          key={catalog.id}
          style={{ cursor: "pointer" }}
          active={catalog.id === catalogStore.selectedCatalog.id}
          onClick={() => handleChangeCatalog(catalog)}
        >
          {catalog.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default CatalogBar;
