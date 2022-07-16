import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { Context } from "../..";
import { createColor, fetchOneProduct } from "../../http/productApi";

const CreateColor = ({ show, onHide, productId }) => {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [file, setFile] = useState({});
  const { product, toast } = useContext(Context);

  const selectFile = (e) => {
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
    await createColor(formData).then((data) => onHide());
    await fetchOneProduct(productId).then((data) =>
      product.setSelectedProduct(data)
    );

    setName("");
    setFile({});
    setCount(0);
    toast.setMessage(`Цвет успешно добавлен`);
    toast.setVariant("info");
    toast.setShow(true);
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
                src={
                  file.preview ||
                  process.env.REACT_APP_API_URL + "/no-image.jpg"
                }
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
                onChange={selectFile}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите код цвета"
            />
          </Row>
          <Row className="mt-2">
            <Form.Control
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="Введите количество"
            />
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

export default observer(CreateColor);
