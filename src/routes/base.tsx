import { RouteObject } from "react-router-dom";
import Home from "../pages/base/views/Home";
import Login from "../pages/base/views/Login";
import Register from "../pages/base/views/Register";
import BaseLayout from "../pages/base/layout/BaseLayout";
import HomeLayout from "../pages/base/layout/HomeLayout";

export const BaseRoutes: RouteObject = {
  path: "/",
  element: <HomeLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
};

export default BaseRoutes;
