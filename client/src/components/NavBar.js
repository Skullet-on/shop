import React, { useContext } from "react";
import { Context } from "..";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/constants";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";
import { Person } from "react-bootstrap-icons";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Navbar
      className="d-flex justify-content-between"
      bg="light"
      variant="light"
      sticky="top"
    >
      <Container>
        <NavLink style={{ color: "black" }} to={SHOP_ROUTE}>
          Альпака
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto">
            {user.user.role === "ADMIN" ? (
              <Button
                variant="outline-dark"
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Админ панель
              </Button>
            ) : (
              ""
            )}
            <Button
              variant="outline-dark"
              onClick={() => user.logout()}
              className="ms-2"
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant="link" onClick={() => navigate(LOGIN_ROUTE)}>
              <Person width="24" height="24" />
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
