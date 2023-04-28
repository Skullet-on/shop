import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { Context } from "../..";
import { createColor, fetchOneProduct } from "../../http/productApi";
import { imagesUrl } from "../../utils/constants";

const CreateColorModal = ({ show, onHide, productId }) => {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [file, setFile] = useState({});
  const { productStore, colorStore, toastStore } = useContext(Context);

  const selectFile = (e) => {
    if (colorStore.errors.img) {
      colorStore.removeFieldErrors("img");
    }
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile({
        file: file,
        preview: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const addColor = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("count", count);
    formData.append("productId", productId);
    formData.append("img", file.file);
    await createColor(formData).then((data) => {
      if (data.errors) {
        colorStore.setErrors(data.errors);
      } else {
        (async () =>
          await fetchOneProduct(productId).then((data) =>
            productStore.setSelectedProduct(data)
          )
        )();
        setName("");
        setFile({});
        setCount(0);
        toastStore.setMessage(`Цвет успешно добавлен`);
        toastStore.setVariant("info");
        toastStore.setShow(true);
        onHide();
      }
    });
  };

  const handleChangeCount = (value) => {
    if (colorStore.errors.count) {
      colorStore.removeFieldErrors("count");
    }
    if (value < 0 || !value) {
      setCount(0);
    } else if (value > 1000) {
      setCount(1000);
    } else {
      setCount(value);
    }
  };

  const handleChangeName = (value) => {
    if (colorStore.errors.name) {
      colorStore.removeFieldErrors("name");
    }
    setName(value);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить цвет
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={3} className="pt-2" style={{ position: "relative" }}>
              <Image
                src={file.preview || imagesUrl + "/no-image.jpg"}
                style={{ width: "100%" }}
              />
              <Form.Control
                type="file"
                style={{
                  opacity: "0",
                  position: "absolute",
                  top: 0,
                  width: "100%",
                  height: "100%",
                }}
                isInvalid={colorStore.errors.img}
                onChange={selectFile}
              />
              <Form.Control.Feedback type={"invalid"}>
                {colorStore.errors.img && colorStore.errors.img.message}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mt-2">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Код цвета</span>
              <Form.Control
                value={name}
                onChange={(e) => handleChangeName(e.target.value)}
                isInvalid={colorStore.errors.name}
                placeholder="Введите код цвета"
              />
              <Form.Control.Feedback type={"invalid"}>
                {colorStore.errors.name && colorStore.errors.name.message}
              </Form.Control.Feedback>
            </div>
          </Row>
          <Row className="mt-2">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Количество</span>
              <Form.Control
                value={count}
                onChange={(e) => handleChangeCount(e.target.value)}
                isInvalid={colorStore.errors.count}
                placeholder="Введите количество"
              />
              <Form.Control.Feedback type={"invalid"}>
                {colorStore.errors.count && colorStore.errors.count.message}
              </Form.Control.Feedback>
            </div>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addColor}>
          Добавить
        </Button>
        <Button variant="outline-dark" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default observer(CreateColorModal);
