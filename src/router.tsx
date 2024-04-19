import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import BaseRoutes from "./routes/base";
import DashboardRoutes from "./routes/dashboard";
import PublicRoutes from "./routes/public"

const route: RouteObject = {
  element: (
    <Outlet />
  ),
  path: "/",
  children: [BaseRoutes, DashboardRoutes, PublicRoutes],
};

const router = createBrowserRouter([route]);

export default router;
