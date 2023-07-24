import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../..";
import { createProperty } from "../../http/productApi";

const CreateProperty = ({ show, onHide }) => {
  const { propertiesStore } = useContext(Context);
  const [value, setValue] = useState("");
  const [currency, setCurrency] = useState("");
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
    createProperty({
      name: value,
      type: selectedType.value,
      currency: currency,
    }).then((data) => {
      if (data.errors) {
        propertiesStore.setErrors(data.errors);
      } else {
        setValue("");
        setCurrency("");
        onHide();
      }
    });
  };

  const handleChangeName = (value) => {
    setValue(value);
    if (Object.keys(propertiesStore.errors).length) {
      propertiesStore.setErrors({});
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить свойство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col sm={4} lg={5}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Название свойства</span>
                <Form.Control
                  value={value}
                  isInvalid={Object.keys(propertiesStore.errors).length}
                  onChange={(e) => handleChangeName(e.target.value)}
                  placeholder="Введите название свойства"
                />
                <Form.Control.Feedback type={"invalid"}>
                  {Object.keys(propertiesStore.errors).length &&
                    propertiesStore.errors.name.message}
                </Form.Control.Feedback>
              </div>
            </Col>
            <Col sm={4} lg={5}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Единица измерения</span>
                <Form.Control
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  placeholder="Введите единицу измерения"
                />
              </div>
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
        </Form>
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

export default observer(CreateProperty);
