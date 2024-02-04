import React, { Profiler } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import Category from "../pages/admin/pages/Category";

import Items from "../pages/admin/pages/Items";
import Supplier from "../pages/admin/pages/Supplier";
import Contract from "../pages/admin/pages/Contract";
import DashboardLayout from "../pages/admin/layout/DashboardLayout";
import Dashboard from "../pages/admin/pages/Dashboard";
import Settings from "../pages/admin/pages/Settings";
import Order from "../pages/admin/pages/Order";
import CreateItem from "../pages/admin/components/items/CreateItem";
import CreateCategory from "../pages/admin/components/category/CreateCategory";
import CreateContract from "../pages/admin/components/contract/CreateContract";
import CreateOrder from "../pages/admin/components/order/CreateOrder";
import PurchaseRequest from "../pages/admin/pages/PurchaseRequest";
import CreateRequest from "../pages/admin/components/request/CreateRequest";
import CreateRequisition from "../pages/admin/components/requisition/CreateRequisition";
import PurchaseRequisition from "../pages/admin/pages/PurchaseRequisition";
import ProtectedRoute from "./ProtectedRoute";
import InvoiceDetails from "../pages/admin/pages/Invoice";
import UpdateSupplier from "../pages/admin/components/supplier/UpdateSupplier";
import EditCategory from "../pages/admin/components/category/UpdateCategories";
import UpdateOrder from "../pages/admin/components/order/UpdateOrder";
import CategoryView from "../pages/admin/views/CategoryView";
import CreateSupplier from "../pages/admin/components/supplier/CreateSupplier";
import Delivery from "../pages/admin/pages/Delivery";
import CsvUploader from "../pages/admin/components/supplier/CsvUploader";
import UpdateItem from "../pages/admin/components/items/UpdateItem";

export const DashboardRoutes: RouteObject = {
  path: "/dashboard",
  element: (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  ),

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
      path: "/dashboard/suppliers/add_supplier",
      element: <CreateSupplier />,
    },
    {
      path: "/dashboard/suppliers/import",
      element: <CsvUploader />,
    },
    {
      path: "/dashboard/update_supplier/:id",
      element: <UpdateSupplier />,
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
      path: "/dashboard/category/edit/:id",
      element: <EditCategory />,
    },
    {
      path: "/dashboard/category/view/:id",
      element: <CategoryView />,
    },
    {
      path: "/dashboard/order/edit/:id",
      element: <UpdateOrder />,
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
      path: "/dashboard/items/update_item/:id",
      element: <UpdateItem />,
    },
    {
      path: "/dashboard/items/add_item",
      element: <CreateItem />,
    },
    {
      path: "/dashboard/category/add_category",
      element: <CreateCategory />,
    },
    {
      path: "/dashboard/contract/add_contract",
      element: <CreateContract />,
    },
    {
      path: "/dashboard/deliveries",
      element: <Delivery />,
    },
    {
      path: "/dashboard/invoice/view",
      element: <InvoiceDetails />,
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
