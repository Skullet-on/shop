import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../index";
import { LOGIN_ROUTE, SHOP_ROUTE } from "../utils/constants";

const Registration = () => {
  const { userStore, toastStore } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userStore.setErrors({});
  }, []);

  const handleClick = async () => {
    try {
      await userStore.registration(email, password);

      if (!Object.keys(userStore.errors).length) {
        navigate(SHOP_ROUTE);

        toastStore.setInfoToast("Вы успешно зарегистрировались, " + email);
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleChange = (field, value) => {
    if (field === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
    if (userStore.errors[field]) {
      userStore.removeErrorField(field);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 280 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Регистрация</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите email"
            isInvalid={
              Object.keys(userStore.errors).length && userStore.errors.email
            }
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Form.Control.Feedback type={"invalid"}>
            {Object.keys(userStore.errors).length &&
              userStore.errors.email &&
              userStore.errors.email.message}
          </Form.Control.Feedback>
          <Form.Control
            className="mt-3"
            placeholder="Введите пароль"
            isInvalid={
              Object.keys(userStore.errors).length && userStore.errors.password
            }
            type="password"
            value={password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {Object.keys(userStore.errors).length &&
              userStore.errors.password &&
              userStore.errors.password.message}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-between mt-3">
            <div>
              Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
            </div>
            <Button variant={"outline-dark"} onClick={handleClick}>
              Регистрация
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default observer(Registration);
