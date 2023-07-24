import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Context } from "../..";
import { createBrand } from "../../http/productApi";

const CreateBrand = ({ show, onHide }) => {
  const { brandStore } = useContext(Context);
  const [value, setValue] = useState("");

  const addBrand = () => {
    createBrand({ name: value }).then((data) => {
      if (data.errors) {
        brandStore.setErrors(data.errors);
      } else {
        setValue("");
        onHide();
      }
    });
  };

  const handleChange = (value) => {
    setValue(value);
    if (Object.keys(brandStore.errors).length) {
      brandStore.setErrors({});
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить бренд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Бренд</span>
            <Form.Control
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              isInvalid={Object.keys(brandStore.errors).length}
              placeholder="Введите название бренда"
            />
            <Form.Control.Feedback type={"invalid"}>
              {Object.keys(brandStore.errors).length &&
                brandStore.errors.name.message}
            </Form.Control.Feedback>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addBrand}>
          Добавить
        </Button>
        <Button variant="outline-dark" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default observer(CreateBrand);
