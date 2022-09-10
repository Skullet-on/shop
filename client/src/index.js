import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Store from "./store/index";
import "./main.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const Context = createContext(null);

root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        ...Store,
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
