import { TbBook, TbCurrencyDollar, TbLock } from "react-icons/tb";
import {
  TfiDashboard,
  TfiShoppingCart,
  TfiUser,
  TfiSettings,
} from "react-icons/tfi";

export interface SidebarLink {
  LinkIcon?: typeof TfiDashboard;
  label: string;
  path: string;
}

export const sidebarLinks: SidebarLink[] = [
  {
    LinkIcon: TfiDashboard,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Purchase Order",
    path: "/dashboard/order",
    LinkIcon: TfiShoppingCart,
  },
  {
    label: "Category",
    path: "/dashboard/category",
    LinkIcon: TfiShoppingCart,
  },
  {
    label: "Suppliers",
    path: "/dashboard/suppliers",
    LinkIcon: TfiUser,
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    LinkIcon: TfiSettings,
  },
  {
    label: "Payments",
    path: "/dashboard/payments",
    LinkIcon: TbCurrencyDollar,
  },
  {
    label: "Products",
    path: "/dashboard/items",
    LinkIcon: TfiShoppingCart,
  },
  {
    label: "Contract",
    path: "/dashboard/contract",
    LinkIcon: TbBook,
  },
  {
    label: "Roles",
    path: "/dashboard/roles",
    LinkIcon: TbLock,
  },
];
