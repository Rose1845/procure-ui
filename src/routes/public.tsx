/* eslint-disable react-refresh/only-export-components */
import { RouteObject } from "react-router-dom";
import ApproveContract from "../pages/admin/components/contract/ApproveContract";
import CreateOffer from "@/pages/admin/components/request/CreateOffer";
import PublicViewLayout from "@/pages/publicview/PublicViewLayout";
import ApproveOrder from "@/pages/admin/components/order/ApproveOrder";

export const PublicRoutes: RouteObject = {
  path: "/public",
  element: <PublicViewLayout />,
  children: [
    {
      path: "/public/quotes/view/:id",
      element: <CreateOffer />,
    },
    {
      path: "/public/order/approve/:id",
      element: <ApproveOrder />,
    },
    {
      path: "/public/contract/approve/:id",
      element: <ApproveContract />,
    },
  ],
};
export default PublicRoutes;
