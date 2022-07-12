import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import FilterStore from "./store/FilterStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const Context = createContext(null);

root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        product: new ProductStore(),
        filter: new FilterStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
