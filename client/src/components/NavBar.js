import React, { useContext, useEffect } from "react";
import { Context } from "..";
import { Navbar, Container, NavDropdown, Form } from "react-bootstrap";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../utils/constants";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Person } from "react-bootstrap-icons";
import { debounce } from "../helpers";
import { fetchCatalogs } from "../http/productApi";

const NavBar = observer(() => {
  const { user, product, toast } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCatalogs().then((data) => product.setCatalogs(data));
  }, []);

  const handleClickCatalog = (catalog) => {
    product.setSelectedCatalog(catalog);

    navigate(SHOP_ROUTE);
  };

  const handleSearch = debounce((value) => {
    product.setSearch(value);
  }, 300);

  const handleLogout = (user) => {
    user.logout();
    navigate(SHOP_ROUTE);
    toast.setMessage("Вы вышли из аккаунта");
    toast.setVariant("info");
    toast.setShow(true);
  };

  return (
    <Navbar
      className="d-flex justify-content-between"
      bg="light"
      variant="light"
      sticky="top"
    >
      <Container>
        <NavDropdown
          id="nav-dropdown-category"
          title="Каталог"
          menuVariant="light"
        >
          {product.catalogs.map((catalog) => (
            <NavDropdown.Item
              key={catalog.id}
              onClick={() => handleClickCatalog(catalog)}
            >
              {catalog.name}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
        <Form className="d-flex" style={{ width: "100%" }}>
          <Form.Control
            type="search"
            placeholder="Поиск"
            className="me-2"
            aria-label="Search"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Form>
        <NavDropdown
          title={<Person width="24" height="24" />}
          id="basic-nav-dropdown"
        >
          {user.isAuth ? (
            <>
              <NavDropdown.Item onClick={() => handleLogout(user)}>
                Выйти
              </NavDropdown.Item>
              {user.user.role === "ADMIN" ? (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => navigate(ADMIN_ROUTE)}>
                    Админка
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
