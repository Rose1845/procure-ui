import React from "react";
import { RouteObject } from "react-router-dom";
import Category from "../pages/admin/views/Category";
import Items from "../pages/admin/views/Items";
import Supplier from "../pages/admin/views/Supplier";
import Contract from "../pages/admin/views/Contract";
import DashboardLayout from "../pages/admin/layout/DashboardLayout";
import Dashboard from "../pages/admin/views/Dashboard";

export const DashboardRoutes: RouteObject = {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/dashboard/suppliers",
      element: <Supplier />,
    },
    {
      path: "/dashboard/payments",
      element: <Items />,
      // loader: dashboardPaymentsLoader,
    },
    {
      path: "/dashboard/orders",
      element: <Category />,
    },
    {
      path: "/dashboard/items",
      element: <Items />,
    },
    {
      path: "/dashboard/contract",
      element: <Contract />,
    },
  ],
};

export default DashboardRoutes;
