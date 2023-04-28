import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../index";
import { REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/constants";

const Auth = () => {
  const { userStore, toastStore } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userStore.setErrors({});
  }, []);

  const handleClick = async () => {
    try {
      await userStore.login(email, password);

      if (!Object.keys(userStore.errors).length) {
        navigate(SHOP_ROUTE);

        toastStore.setInfoToast("Вы успешно вошли, " + email);
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleChange = (input, value) => {
    if (input === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
    Object.keys(userStore.errors).length && userStore.setErrors({});
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 280 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Авторизация</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите email"
            isInvalid={Object.keys(userStore.errors).length}
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите пароль"
            isInvalid={Object.keys(userStore.errors).length}
            type="password"
            value={password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Неверное имя пользователя, или пароль
          </Form.Control.Feedback>
          <div className="d-flex justify-content-between mt-3">
            <div>
              Нет аккаунта?{" "}
              <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
            </div>
            <Button variant={"outline-dark"} onClick={handleClick}>
              Войти
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default observer(Auth);
