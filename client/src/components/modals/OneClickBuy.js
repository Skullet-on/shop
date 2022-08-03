import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Context } from "../..";

const OneClickBuy = ({ show, onHide }) => {
  const { modal } = useContext(Context);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const sendOrder = () => {
    console.log(modal.oneClickBuyModal.product);
    modal.oneClickBuyModal.setProduct(null);
    setEmail("");
    setName("");
    setPhone("");
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Купить в один клик
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Имя</Form.Label>
          <Form.Control
            className="mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите Имя"
          />
          <Form.Label>Электронная почта</Form.Label>
          <Form.Control
            className="mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
          />
          <Form.Label>Телефон</Form.Label>
          <Form.Control
            className="mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Введите Телефон"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={sendOrder}>
          Отправить
        </Button>
        <Button variant="outline-dark" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default observer(OneClickBuy);
