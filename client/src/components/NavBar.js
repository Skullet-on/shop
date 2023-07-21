import React, { useContext, useEffect } from "react";
import { Context } from "..";
import { Navbar, Container, NavDropdown, Nav, Badge } from "react-bootstrap";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  PAID_AND_DELIVERY,
  SHOP_ROUTE,
} from "../utils/constants";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Person } from "react-bootstrap-icons";
import { ucFirst } from "../helpers";
import { fetchCatalogs } from "../http/productApi";
import NavBasket from "./NavBasket";

const NavBar = observer(() => {
  const { userStore, catalogStore, toastStore, orderStore } = useContext(
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

  const handleLogout = (user) => {
    user.logout();
    navigate(SHOP_ROUTE);
    toastStore.setInfoToast("Вы вышли из аккаунта");
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
        <div className="d-flex" style={{ width: "100%" }}>
        </div>
        <NavBasket />
        <NavDropdown
          align="end"
          title={userStore.user.role === "ADMIN" && orderStore.getNotIsDoneCount() 
            ? <>
                <Person width="24" height="24" />
                <Badge
                  pill
                  bg="danger"
                  text="light"
                  style={{ position: "absolute", right: 10, top: 3 }}                
                >
                  {orderStore.getNotIsDoneCount()}
                </Badge>
              </> 
            : <Person width="24" height="24" />}
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
                      {orderStore.getNotIsDoneCount() ? <Badge
                        pill
                        bg="danger"
                        text="light"
                        className="ms-1"
                      >
                        {orderStore.getNotIsDoneCount()}
                      </Badge> : ""
                    }   
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
              {/* <NavDropdown.Item onClick={() => navigate(REGISTRATION_ROUTE)}>
                Зарегистрироваться
              </NavDropdown.Item> */}
            </>
          )}
        </NavDropdown>
      </Container>
    </Navbar>
  );
});

export default NavBar;
