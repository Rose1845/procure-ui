import React from "react";
import { RouteObject } from "react-router-dom";
import Loader from "../loader";
import Dashboard from "../pages/admin/views/Dashboard";

export const AdminRoutes: RouteObject = {
  path: "/dashboard",
  element: (
    <Dashboard/>
    // <React.Suspense fallback={<Loader />}>
    //   <Dashboard />
    // </React.Suspense>
  ),
  //   children: [
  //     {
  //       path: "/admin",
  //       element: <AdminAnalytics />,
  //       id: "admin-analytics",
  //     },
  //     {
  //       path: "/admin/payments",
  //       element: <AdminPayments />,
  //       // loader: AdminPaymentsLoader,
  //     },
  //     {
  //       path: "/admin/orders",
  //       element: <AdminOrders />,
  //     },
  //     {
  //       path: "/admin/products",
  //       element: <AdminProducts />,
  //     },
  //     {
  //       path: "/admin/courses",
  //       element: <AdminCourses />,
  //     },
  //     {
  //       path: "/admin/settings",
  //       element: <AdminSettings />,
  //     },
  //     {
  //       path: "/admin/users",
  //       element: <AdminUsers />,
  //     },
  //     {
  //       path: "/admin/roles",
  //       element: <AdminRoles />,
  //     },
  //   ],
};

export default AdminRoutes;
