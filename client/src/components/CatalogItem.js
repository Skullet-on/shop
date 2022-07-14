import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap";
import { Context } from "..";

const CatalogItem = ({ catalog, removeProperty }) => {
  const { modal } = useContext(Context);
  const [edit, setEdit] = useState(false);
  const [catalogName, setCatalogName] = useState("");

  useEffect(() => {
    setCatalogName(catalog.name);
  }, []);

  const handleEdit = (edit) => {
    if (edit) {
      console.log(catalogName);
    }

    setEdit(!edit);
  };

  const handleAddCatalogProperty = (catalogId) => {
    modal.addPropertyModal.setCatalogId(catalogId);
    modal.addPropertyModal.setShow(true);
  };

  return (
    <Card className="mt-3">
      <InputGroup>
        <Form.Control
          value={catalogName}
          onChange={(e) => setCatalogName(e.target.value)}
          disabled={!edit}
        />
        <Button
          variant={edit ? "outline-success" : "outline-warning"}
          onClick={() => handleEdit(edit)}
        >
          {edit ? "Применить" : "Изменить"}
        </Button>
        <Button variant="outline-danger">Удалить</Button>
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
