import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Context } from "..";

const OrderForm = ({ submitForm }) => {
  const { basketStore } = useContext(Context);
  const [fio, setFio] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [corp, setCorp] = useState("");
  const [flat, setFlat] = useState("");

  useEffect(() => {
    setFio("");
    setPhone("");
    setDescription("");
    setCity("");
    setStreet("");
    setBuilding("");
    setCorp("");
    setFlat("");
    basketStore.setErrors({});
  }, []);

  const handleChangeFio = (value) => {
    if (basketStore.errors.fio) {
      basketStore.removeFieldErrors("fio");
    }
    setFio(value);
  };

  const handleChangePhone = (value) => {
    if (basketStore.errors.phone) {
      basketStore.removeFieldErrors("phone");
    }
    setPhone(value);
  };

  const handleChangeCity = (value) => {
    if (basketStore.errors.city) {
      basketStore.removeFieldErrors("city");
    }
    setCity(value);
  };

  const handleChangeStreet = (value) => {
    if (basketStore.errors.street) {
      basketStore.removeFieldErrors("street");
    }
    setStreet(value);
  };

  const handleChangeBuilding = (value) => {
    if (basketStore.errors.building) {
      basketStore.removeFieldErrors("building");
    }
    setBuilding(value);
  };

  const handleChangeCorp = (value) => {
    if (basketStore.errors.corp) {
      basketStore.removeFieldErrors("corp");
    }
    setCorp(value);
  };

  const handleChangeFlat = (value) => {
    if (basketStore.errors.flat) {
      basketStore.removeFieldErrors("flat");
    }
    setFlat(value);
  };

  return (
    <Form>
      <Form.Group md="4">
        <Form.Label>ФИО</Form.Label>
        <Form.Control
          required
          type="text"
          value={fio}
          onChange={(e) => handleChangeFio(e.target.value)}
          placeholder="Введите ФИО"
          isInvalid={basketStore.errors.fio}
        />
        <Form.Control.Feedback type={"invalid"}>
          {basketStore.errors.fio && basketStore.errors.fio.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group md="4">
        <Form.Label>Номер телефона</Form.Label>
        <Form.Control
          required
          type="text"
          data-inputmask="'alias': 'email'"
          value={phone}
          onChange={(e) => handleChangePhone(e.target.value)}
          placeholder="+375 (xx) xxx-xx-xx"
          isInvalid={basketStore.errors.phone}
        />
        <Form.Control.Feedback type={"invalid"}>
          {basketStore.errors.phone && basketStore.errors.phone.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Row>
        <Col md={9}>
          <Form.Group>
            <Form.Label>Город</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => handleChangeCity(e.target.value)}
              placeholder="Город"
              isInvalid={basketStore.errors.city}
            />
            <Form.Control.Feedback type={"invalid"}>
              {basketStore.errors.city && basketStore.errors.city.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Улица</Form.Label>
            <Form.Control
              type="text"
              value={street}
              onChange={(e) => handleChangeStreet(e.target.value)}
              placeholder="Улица"
              isInvalid={basketStore.errors.street}
            />
            <Form.Control.Feedback type={"invalid"}>
              {basketStore.errors.street && basketStore.errors.street.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Дом</Form.Label>
            <Form.Control
              type="text"
              value={building}
              onChange={(e) => handleChangeBuilding(e.target.value)}
              placeholder="Дом"
              isInvalid={basketStore.errors.building}
            />
            <Form.Control.Feedback type={"invalid"}>
              {basketStore.errors.building &&
                basketStore.errors.building.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Корпус</Form.Label>
            <Form.Control
              type="text"
              value={corp}
              onChange={(e) => handleChangeCorp(e.target.value)}
              placeholder="Корпус"
              isInvalid={basketStore.errors.corp}
            />
            <Form.Control.Feedback type={"invalid"}>
              {basketStore.errors.corp && basketStore.errors.corp.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Квартира</Form.Label>
            <Form.Control
              type="text"
              value={flat}
              onChange={(e) => handleChangeFlat(e.target.value)}
              placeholder="Квартира"
              isInvalid={basketStore.errors.flat}
            />
            <Form.Control.Feedback type={"invalid"}>
              {basketStore.errors.flat && basketStore.errors.flat.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Комментарий к заказу</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Комментарий к заказу"
          rows={3}
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={(e) =>
          submitForm(e, {
            fio,
            phone,
            description,
            city,
            street,
            building,
            corp,
            flat,
          })
        }
        type="submit"
      >
        Оформить заказ
      </Button>
    </Form>
  );
};

export default observer(OrderForm);
