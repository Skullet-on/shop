import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import FilterStore from "./store/FilterStore";
import ModalStore from "./store/ModalStore";
import ToastStore from "./store/ToastStore";
import BasketStore from "./store/BasketStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const Context = createContext(null);

root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        userStore: new UserStore(),
        productStore: new ProductStore(),
        filterStore: new FilterStore(),
        modalStore: new ModalStore(),
        toastStore: new ToastStore(),
        basketStore: new BasketStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
