import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./index";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { Spinner } from "react-bootstrap";
import TopBar from "./components/TopBar";

const App = () => {
  const { user, basket } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      user.check();
    }
    if (localStorage.getItem("basket")) {
      const items = JSON.parse(localStorage.getItem("basket"));

      basket.setItems(items);
    }
  }, []);

  if (user.isLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <BrowserRouter>
      <TopBar />
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
};

export default observer(App);
