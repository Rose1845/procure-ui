import { RouteObject } from "react-router-dom";
import Home from "../pages/base/views/Home";
import Login from "../pages/base/views/Login";
import Register from "../pages/base/views/Register";
import HomeLayout from "../pages/base/layout/HomeLayout";
import ApproveContract from "../pages/admin/components/contract/ApproveContract";
import VerifyEmail from "@/pages/base/views/VerifyEmail";
import Confirmation from "@/pages/base/views/Confirmation";
import ChangePassword from "@/pages/base/views/ChangePassword";

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
      path: "verifyEmail",
      element: <VerifyEmail />,
    },
    {
      path: "verifyOtp/:email",
      element: < Confirmation />,
    },
    {
      path: "change-password/:email",
      element: < ChangePassword />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "/contract/approve/:id",
      element: <ApproveContract />,
    },
  ],
};

export default BaseRoutes;
