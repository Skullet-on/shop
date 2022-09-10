import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Context } from "../..";
import { createCatalog } from "../../http/productApi";

const CreateCatalog = ({ show, onHide }) => {
  const { toastStore, catalogStore } = useContext(Context);

  const [value, setValue] = useState("");

  const addCatalog = () => {
    createCatalog({ name: value }).then((data) => {
      if (data.errors) {
        catalogStore.setErrors(data.errors);
      } else {
        setValue("");
        onHide();
      }
    });

    toastStore.setMessage(`Каталог ${value} успешно создан`);
    toastStore.setVariant("info");
    toastStore.setShow(true);
  };

  const handleChange = (value) => {
    setValue(value);
    if (Object.keys(catalogStore.errors).length) {
      catalogStore.setErrors({});
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
            onChange={(e) => handleChange(e.target.value)}
            isInvalid={Object.keys(catalogStore.errors).length}
            placeholder="Введите название каталога"
          />
          <Form.Control.Feedback type={"invalid"}>
            {Object.keys(catalogStore.errors).length &&
              catalogStore.errors.name.message}
          </Form.Control.Feedback>
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

export default observer(CreateCatalog);
