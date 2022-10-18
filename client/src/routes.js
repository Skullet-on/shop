import React from "react";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import NewAdminPage from "./pages/NewAdminPage";
import Orders from "./pages/Orders";
import PageNotFound from "./pages/PageNotFound";
import PaidAndDelivery from "./pages/PaidAndDelivery";
import ProductPage from "./pages/ProductPage";
import Registration from "./pages/Registration";
import Shop from "./pages/Shop";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  NOT_FOUND_ROUTE,
  ORDERS_ROUTE,
  PAID_AND_DELIVERY,
  PRODUCT_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "./utils/constants";

export const authRoutes = [
  {
    path: NOT_FOUND_ROUTE,
    element: <PageNotFound />,
  },
];

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    element: <NewAdminPage />,
  },
  {
    path: NOT_FOUND_ROUTE,
    element: <PageNotFound />,
  },
  {
    path: ORDERS_ROUTE,
    element: <Orders />,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    element: <Shop />,
  },
  {
    path: LOGIN_ROUTE,
    element: <Auth />,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <Registration />,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    element: <ProductPage />,
  },
  {
    path: BASKET_ROUTE,
    element: <Basket />,
  },
  {
    path: NOT_FOUND_ROUTE,
    element: <PageNotFound />,
  },
  {
    path: PAID_AND_DELIVERY,
    element: <PaidAndDelivery />,
  },
];
