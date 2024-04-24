// import { TbBook, TbCurrencyDollar } from "react-icons/tb";
import {
  TfiDashboard,
  TfiShoppingCart,
  TfiUser,
  // TfiSettings,
} from "react-icons/tfi";

export interface SidebarLink {
  LinkIcon?: typeof TfiDashboard;
  label: string;
  path: string;
  children?: SidebarLink[];
}

export const sidebarLinks: SidebarLink[] = [
  {
    LinkIcon: TfiDashboard,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Category",
    path: "/dashboard/category",
    LinkIcon: TfiShoppingCart,
  },
  // {
  //   label: "Approvals",
  //   path: "/dashboard/approval",
  //   LinkIcon: TfiShoppingCart,
  // },
  {
    label: "Suppliers",
    path: "/dashboard/suppliers",
    LinkIcon: TfiUser,
  },

  {
    label: "Items",
    path: "/dashboard/items",
    LinkIcon: TfiShoppingCart,
  },
  {
    label: "Transaction",
    path: "",
    children: [
      // {
      //   label: "Purchase Requisition",
      //   path: "/dashboard/purchase-requisition",
      //   // LinkIcon: TfiShoppingCart,
      // },
      {
        label: "Purchase Request",
        path: "/dashboard/purchase-request",
        // LinkIcon: TfiShoppingCart,
      },
      {
        label: "Purchase Order",
        path: "/dashboard/order",
        // LinkIcon: TfiShoppingCart,
      },
      {
        label: "Contract",
        path: "/dashboard/contract",
        // LinkIcon: TbBook,
      },
      {
        label: "Invoice",
        path: "/dashboard/invoice",
        // LinkIcon: TbCurrencyDollar,
      },
      {
        label: "Deliveries",
        path: "/dashboard/deliveries",
        // LinkIcon: TbCurrencyDollar,
      },
    ],
  },
];


