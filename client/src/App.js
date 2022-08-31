import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./index";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { Spinner } from "react-bootstrap";
import TopBar from "./components/TopBar";
import { fetchBrands, fetchCatalogs, fetchProperties } from "./http/productApi";
import { LS_BASKET, LS_TOKEN } from "./Constants";

const App = () => {
  const { productStore, userStore, basketStore } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem(LS_TOKEN)) {
      userStore.check();
    }
    if (localStorage.getItem(LS_BASKET)) {
      const items = JSON.parse(localStorage.getItem(LS_BASKET));

      basketStore.setItems(items);
    }

    fetchCatalogs().then((data) => {
      productStore.setCatalogs(data);
      productStore.setSelectedCatalog(data[0]);
    });
    fetchBrands().then((data) => productStore.setBrands(data));
    fetchProperties().then((data) => {
      productStore.setProperties(data);
    });
  }, []);

  if (userStore.isLoading) {
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
