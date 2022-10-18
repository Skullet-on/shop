import React, { useContext, useEffect } from "react";
import { Context } from "..";
import { Navbar, Container, NavDropdown, Form, Nav } from "react-bootstrap";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  PAID_AND_DELIVERY,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../utils/constants";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Person } from "react-bootstrap-icons";
import { debounce, ucFirst } from "../helpers";
import { fetchCatalogs } from "../http/productApi";
import NavBasket from "./NavBasket";

const NavBar = observer(() => {
  const { userStore, productStore, catalogStore, toastStore } = useContext(
    Context
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchCatalogs().then((data) => catalogStore.setCatalogs(data));
  }, []);

  const handleClickCatalog = (catalog) => {
    catalogStore.setSelectedCatalog(catalog);

    navigate(SHOP_ROUTE);
  };

  const handleSearch = debounce((value) => {
    productStore.setSearch(value);
  }, 300);

  const handleLogout = (user) => {
    user.logout();
    navigate(SHOP_ROUTE);
    toastStore.setMessage("Вы вышли из аккаунта");
    toastStore.setVariant("info");
    toastStore.setShow(true);
  };

  const handleClickPaid = (e) => {
    e.preventDefault();
    navigate(PAID_AND_DELIVERY);
  };

  return (
    <Navbar
      className="d-flex justify-content-between"
      variant="light"
      bg="primary"
      sticky="top"
    >
      <Container>
        <NavDropdown id="nav-dropdown-category" title="Каталог">
          {catalogStore.catalogs.map((catalog) => (
            <NavDropdown.Item
              key={catalog.id}
              onClick={() => handleClickCatalog(catalog)}
            >
              {ucFirst(catalog.name)}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
        <Nav.Link href={PAID_AND_DELIVERY} onClick={(e) => handleClickPaid(e)}>
          Доставка и оплата
        </Nav.Link>
        <Form className="d-flex" style={{ width: "100%" }}>
          <Form.Control
            type="search"
            placeholder="Поиск"
            className="me-2"
            aria-label="Search"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Form>
        <NavBasket />
        <NavDropdown
          align="end"
          title={<Person width="24" height="24" />}
          id="auth-dropdown"
        >
          {userStore.isAuth ? (
            <>
              <NavDropdown.Item onClick={() => handleLogout(userStore)}>
                Выйти
              </NavDropdown.Item>
              {userStore.user.role === "ADMIN" ? (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => navigate(ADMIN_ROUTE)}>
                    Админка
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate(ORDERS_ROUTE)}>
                    Заказы
                  </NavDropdown.Item>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <NavDropdown.Item onClick={() => navigate(LOGIN_ROUTE)}>
                Войти
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate(REGISTRATION_ROUTE)}>
                Зарегистрироваться
              </NavDropdown.Item>
            </>
          )}
        </NavDropdown>
      </Container>
    </Navbar>
  );
});

export default NavBar;
