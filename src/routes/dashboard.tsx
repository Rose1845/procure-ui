import React from "react";
import { RouteObject } from "react-router-dom";
import Category from "../pages/admin/views/Category";
import Items from "../pages/admin/views/Items";
import Supplier from "../pages/admin/views/Supplier";
import Dashboard from "../pages/admin/views/Dashboard";
import Contract from "../pages/admin/views/Contract";

export const DashboardRoutes: RouteObject = {
  path: "/dashboard",
  element: (
    <Dashboard  />
    // <React.Suspense fallback={<Loader />}>
    //   <Dashboard />
    // </React.Suspense>
  ),
  children: [
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
