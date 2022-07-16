import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "..";
import { adminRoutes, authRoutes, publicRoutes } from "../routes";

function AppRouter() {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.isAuth &&
        user.user.role === "ADMIN" &&
        adminRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      {user.isAuth &&
        authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default observer(AppRouter);
