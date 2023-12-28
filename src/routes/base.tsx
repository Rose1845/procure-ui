import { RouteObject } from "react-router-dom";
import Home from "../pages/base/views/Home";
import Login from "../pages/base/views/Login";
import Register from "../pages/base/views/Register";

export const BaseRoutes: RouteObject = {
  path: "/",
  element: <Home />,
  children: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
};

export default BaseRoutes;
