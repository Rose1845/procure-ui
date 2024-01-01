import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import Category from "../pages/admin/views/Category";
import Items from "../pages/admin/views/Items";
import Supplier from "../pages/admin/views/Supplier";
import Contract from "../pages/admin/views/Contract";
import DashboardLayout from "../pages/admin/layout/DashboardLayout";
import Dashboard from "../pages/admin/views/Dashboard";
import Settings from "../pages/admin/views/Settings";
import useAuth from "../hooks/useAuth";
import Order from "../pages/admin/views/Order";
import CreateItem from "../pages/admin/components/items/CreateItem";
import CreateCategory from "../pages/admin/components/category/CreateCategory";
import CreateContract from "../pages/admin/components/contract/CreateContract";
import CreateOrder from "../pages/admin/components/order/CreateOrder";
import PurchaseRequest from "../pages/admin/views/PurchaseRequest";
import CreateRequest from "../pages/admin/components/request/CreateRequest";
import CreateRequisition from "../pages/admin/components/requisition/CreateRequisition";
import PurchaseRequisition from "../pages/admin/views/PurchaseRequisition";
const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};
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
      path: "/dashboard/category",
      element: <Category />,
    },
    {
      path: "/dashboard/items/add_order",
      element: <CreateOrder />,
    },
    {
      path: "/dashboard/order",
      element: <Order />,
    },
    {
      path: "/dashboard/purchase-request",
      element: <PurchaseRequest />,
    },
    {
      path: "/dashboard/purchase-requisition",
      element: <PurchaseRequisition />,
    },
    {
      path: "/dashboard/purchase-request/add-request",
      element: <CreateRequest />,
    },
    {
      path: "/dashboard/purchase-requisition/add_requisition",
      element: <CreateRequisition />,
    },
    {
      path: "/dashboard/items",
      element: <Items />,
    },
    {
      path: "/dashboard/items/add_item",
      element: <CreateItem />,
    },
    {
      path: "/dashboard/items/add_category",
      element: <CreateCategory />,
    },
    {
      path: "/dashboard/items/add_contract",
      element: <CreateContract />,
    },
    {
      path: "/dashboard/contract",
      element: <Contract />,
    },
    {
      path: "/dashboard/settings",
      element: <Settings />,
    },
  ],
};

export default DashboardRoutes;
