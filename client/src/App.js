import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./index";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { Spinner } from "react-bootstrap";

const App = () => {
  const { user } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      user.check();
    }
  }, []);

  if (user.isLoading) {
    return <Spinner animation="grow" />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
};

export default observer(App);
