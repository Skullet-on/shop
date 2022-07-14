import React, { useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { createProperty } from "../../http/productApi";

const CreateProperty = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const types = [
    {
      id: 1,
      name: "Число",
      value: "number",
    },
    {
      id: 2,
      name: "Строка",
      value: "string",
    },
  ];
  const [selectedType, setSelectedType] = useState(types[0]);

  const addProperty = () => {
    createProperty({ name: value, type: selectedType.value }).then((data) => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить свойство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col sm={9} lg={10}>
            <Form>
              <Form.Control
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Введите название свойства"
              />
            </Form>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle>
                {selectedType.name || "Выберите свойство"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {types.map((type) => (
                  <Dropdown.Item
                    key={type.id}
                    onClick={() => setSelectedType(type)}
                  >
                    {type.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addProperty}>
          Добавить
        </Button>
        <Button variant="outline-dark" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProperty;
