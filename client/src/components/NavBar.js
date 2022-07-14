import React, { useContext } from "react";
import { Context } from "..";
import {
  Navbar,
  Nav,
  Button,
  Container,
  NavDropdown,
  Form,
} from "react-bootstrap";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/constants";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Person } from "react-bootstrap-icons";
import { debounce } from "../helpers";

const NavBar = observer(() => {
  const { user, product } = useContext(Context);
  const navigate = useNavigate();

  const handleClickCatalog = (catalog) => {
    product.setSelectedCatalog(catalog);

    navigate(SHOP_ROUTE);
  };

  const handleSearch = debounce((value) => {
    console.log(value);
    product.setSearch(value);
  }, 300);

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
