import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import BaseRoutes from "./routes/base";
import DashboardRoutes from "./routes/dashboard";
import AuthProvider from "./routes/AuthProvider";

const route: RouteObject = {
  element: (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  ),
  path: "/",
  children: [BaseRoutes, DashboardRoutes],
};

const router = createBrowserRouter([route]);

export default router;
