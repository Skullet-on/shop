import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createCatalog } from "../../http/productApi";

const CreateCatalog = ({ show, onHide }) => {
  const [value, setValue] = useState("");

  const addCatalog = () => {
    createCatalog({ name: value }).then((data) => {
      setValue("");
      onHide();
    });
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

export default CreateCatalog;
