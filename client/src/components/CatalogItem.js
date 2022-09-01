import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap";
import { Context } from "..";
import { editCatalog, fetchCatalogs } from "../http/productApi";

const CatalogItem = ({ catalog, removeProperty, removeCatalog }) => {
  const { modalStore, catalogStore } = useContext(Context);
  const [edit, setEdit] = useState(false);
  const [catalogName, setCatalogName] = useState("");

  useEffect(() => {
    setCatalogName(catalog.name);
  }, []);

  const handleEdit = (catalogId, edit) => {
    if (edit) {
      editCatalog(catalogId, catalogName).then((data) => {
        if (data.errors) {
          catalogStore.setCatalogErrors(catalogId, data.errors);
        } else {
          fetchCatalogs().then((data) => {
            catalogStore.setCatalogs(data);
          });
          setEdit(!edit);
        }
      });
    } else {
      setEdit(!edit);
    }
  };

  const handleAddCatalogProperty = (catalogId) => {
    modalStore.addPropertyModal.setCatalogId(catalogId);
    modalStore.addPropertyModal.setShow(true);
  };

  const handleChangeCatalog = (value, catalogId) => {
    setCatalogName(value);
    catalogStore.setCatalogErrors(catalogId, undefined);
  };

  return (
    <Card className="mt-3">
      <InputGroup>
        <Form.Control
          value={catalogName}
          isInvalid={catalog.errors}
          onChange={(e) => handleChangeCatalog(e.target.value, catalog.id)}
          disabled={!edit}
        />
        <Button
          variant={edit ? "outline-success" : "outline-warning"}
          onClick={() => handleEdit(catalog.id, edit)}
        >
          {edit ? "Применить" : "Изменить"}
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => removeCatalog(catalog.id)}
        >
          Удалить
        </Button>
        <Form.Control.Feedback type={"invalid"}>
          {catalog.errors && catalog.errors.name.message}
        </Form.Control.Feedback>
      </InputGroup>
      <ListGroup variant="flush">
        {catalog.properties.map((property) => (
          <ListGroup.Item
            key={property.id}
            className="d-flex justify-content-between align-items-center pt-0 pb-0"
          >
            {property.name}
            <Button
              variant="link"
              onClick={() => removeProperty(catalog.id, property.id)}
            >
              Удалить
            </Button>
          </ListGroup.Item>
        ))}
        <Button
          variant="outline-secondary"
          onClick={() => handleAddCatalogProperty(catalog.id)}
        >
          Добавить свойство
        </Button>
      </ListGroup>
    </Card>
  );
};

export default observer(CatalogItem);
