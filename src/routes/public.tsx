import { RouteObject } from "react-router-dom";
import PublicViewLayout from "../pages/publicview/PublicViewLayout";
import ApproveContract from "../pages/admin/components/contract/ApproveContract";
import Public from "../pages/admin/pages/Public";

export const publicRoutea: RouteObject = {
  path: "",
  element: <PublicViewLayout />,
  children: [
    {
      path: "/public",
      element: <Public />,
    },
    {
      path: "/contract/approve/:id",
      element: <ApproveContract />,
    },
  ],
};
