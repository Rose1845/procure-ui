/* eslint-disable react-refresh/only-export-components */
import { RouteObject } from "react-router-dom";
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
import UpdateSupplier from "../pages/admin/components/supplier/UpdateSupplier";
import EditCategory from "../pages/admin/components/category/UpdateCategories";
import UpdateOrder from "../pages/admin/components/order/UpdateOrder";
import CategoryView from "../pages/admin/views/CategoryView";
import CreateSupplier from "../pages/admin/components/supplier/CreateSupplier";
import CsvUploader from "../pages/admin/components/supplier/CsvUploader";
import UpdateItem from "../pages/admin/components/items/UpdateItem";
import ContractView from "../pages/admin/views/ContractView";
import Deliveries from "../pages/admin/pages/Deliveries";
import OrderView from "../pages/admin/views/Order";
import CreateDelivery from "../pages/admin/components/delivery/CreateDelivery";
import CreateInvoice from "../pages/admin/components/invoice/CreateInvoice";
import Invoice from "../pages/admin/pages/Invoice";
import InvoiceView from "../pages/admin/views/Invoice";
import CsvCategoryUploader from "../pages/admin/components/category/CsvCategoryUploader";
import RequestView from "@/pages/admin/views/RequestView";
import CreateOrderFromContract from "@/pages/admin/components/order/CreateOrderFromContract";
import ApproveContract from "@/pages/admin/components/contract/ApproveContract";
import CompareOffers from "@/pages/admin/views/CompareOffers";
import TotalCostEvaluation from "@/pages/admin/views/TotalCostEvaluation";
import Profile from "@/pages/admin/components/user/Profile";
import Roles from "@/pages/admin/pages/Roles";
import ItemView from "@/pages/admin/views/ItemView";
import AuthorityRoute from "./UserAuthority";
import AddNewUser from "@/pages/admin/components/users/AddNewUser";
import UpdatePassword from "@/pages/admin/components/user/UpdatePassword";
import AddRoleToUser from "@/pages/admin/components/user/AddRoleToUser";
import DeliveryView from "@/pages/admin/views/DeliveryView";
import Approvals from "@/pages/admin/pages/Approvals";
import UpdateContract from "@/pages/admin/components/contract/UpdateContract";
import RemoveRoleFromUser from "@/pages/admin/components/user/RemoveRoleFromUser";
import CreateRole from "@/pages/admin/components/Roles/CreateRole";

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
      path: "/dashboard/category/import",
      element: <CsvCategoryUploader />,
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
      path: "/dashboard/contract/edit/:id",
      element: <UpdateContract />,
    },
    {
      path: "/dashboard/roles/add_role",
      element: <Roles />,
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
      path: "/dashboard/contract/approve/:id",
      element: <ApproveContract />,
    },
    {
      path: "/dashboard/profile/user/:id",
      element: <Profile />,
    },
    {
      path: "/dashboard/user/add_role/:id",
      element: <AddRoleToUser />,
    },
    {
      path: "/dashboard/user/create_role",
      element: <CreateRole />,
    },
    {
      path: "/dashboard/user/remove_role/:id",
      element: <RemoveRoleFromUser />,
    },
    {
      path: "/dashboard/user/update_password/:id",
      element: <UpdatePassword />,
    },
    {
      path: "/dashboard/order/add_order",
      element: <CreateOrder />,
    },
    {
      path: "/dashboard/order/add_order_from_contract",
      element: <CreateOrderFromContract />,
    },
    {
      path: "/dashboard/order",
      element: <Order />,
    },
    {
      path: "/dashboard/order/view/:id",
      element: <OrderView />,
    },
    {
      path: "/dashboard/delivery/view/:id",
      element: <DeliveryView />,
    },
    {
      path: "/dashboard/request/view/:id",
      element: <RequestView />,
    },
    {
      path: "/dashboard/quotes/compare_offers/:id",
      element: <CompareOffers />,
    },
    {
      path: "/dashboard/quotes/tco_evaluation/:id",
      element: <TotalCostEvaluation />,
    },
    {
      path: "/dashboard/approval",
      element: <Approvals />,
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
      path: "/dashboard/item/view/:id",
      element: <ItemView />,
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
      path: "/dashboard/contract/view/:id",
      element: <ContractView />,
    },
    {
      path: "/dashboard/invoice/add",
      element: <CreateInvoice />,
    },
    {
      path: "/dashboard/settings",
      element: <Settings />,
    },
    {
      path: "/dashboard/invoice",
      element: <Invoice />,
    },
    {
      path: "/dashboard/deliveries",
      element: <Deliveries />,
    },
    {
      path: "/dashboard/add/new_user",
      element: (
        <AuthorityRoute perm="ADMIN">
          <AddNewUser />
        </AuthorityRoute>
      ),
    },
    {
      path: "/dashboard/deliveries/add/:id",
      element: (
        <AuthorityRoute perm="ADMIN">
          <CreateDelivery />
        </AuthorityRoute>
      ),
    },
    {
      path: "/dashboard/invoice/view/:id",
      element: <InvoiceView />,
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
