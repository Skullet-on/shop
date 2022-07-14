import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { Context } from "../..";
import { createCatalog } from "../../http/productApi";

const CreateCatalog = ({ show, onHide }) => {
  const { product } = useContext(Context);

  const [value, setValue] = useState("");
  const [properties, setProperties] = useState([]);

  const addCatalog = () => {
    createCatalog({ name: value, properties }).then((data) => {
      setValue("");
      onHide();
    });
  };

  const handleCheckProperty = (property) => {
    if (properties.includes(property.id)) {
      console.log(property.id);
      setProperties(properties.filter((id) => id !== property.id));
    } else {
      setProperties([...properties, property.id]);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить каталог
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите название каталога"
          />
        </Form>
        <div className="mt-3">
          {product.properties.map((property) => (
            <InputGroup key={property.id}>
              <InputGroup.Checkbox
                checked={properties.includes(property.id)}
                onChange={() => handleCheckProperty(property)}
                aria-label="Checkbox for following text input"
              />
              <Form.Control
                style={{ cursor: "pointer" }}
                value={property.name}
                readOnly
                onClick={() => handleCheckProperty(property)}
              />
            </InputGroup>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addCatalog}>
          Добавить
        </Button>
        <Button variant="outline-dark" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default observer(CreateCatalog);
