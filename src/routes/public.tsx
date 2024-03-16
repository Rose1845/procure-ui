import { RouteObject } from "react-router-dom";
import ApproveContract from "../pages/admin/components/contract/ApproveContract";
import Public from "../pages/admin/pages/Public";
import CreateOffer from "@/pages/admin/components/request/CreateOffer";
import PublicViewLayout from "@/pages/publicview/PublicViewLayout";

export const PublicRoutes: RouteObject = {
  path: "/public",
  element: (<PublicViewLayout />),
  children: [
    {
      path: "/public",
      element: <Public />,
    },
    {
      path: "/public/quotes/view/:id",
      element: <CreateOffer />,
    },
    {
      path: "/public/contract/approve/:id",
      element: <ApproveContract />,
    },
  ],
};
export default PublicRoutes;
