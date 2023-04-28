import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Context } from "../..";
import { addCatalogProperty } from "../../http/productApi";

const AddProperty = ({ show, onHide, catalogId }) => {
  const { toastStore, propertiesStore } = useContext(Context);
  const [value, setValue] = useState({});

  const handleAddProperty = () => {
    addCatalogProperty(catalogId, [value]).then((data) => {
      setValue({});
      onHide();
    });

    toastStore.setInfoToast(`Свойство добавлено к продукту`);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить свойство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown>
          <Dropdown.Toggle>{value.name || "Выберите свойство"}</Dropdown.Toggle>
          <Dropdown.Menu>
            {propertiesStore.properties.map((property) => (
              <Dropdown.Item
                key={property.id}
                onClick={() => setValue(property)}
              >
                {property.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={handleAddProperty}>
          Добавить
        </Button>
        <Button variant="outline-dark" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default observer(AddProperty);
