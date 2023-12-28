import { createBrowserRouter } from "react-router-dom";
import BaseRoutes from "./routes/base";
import DashboardRoutes  from "./routes/dashboard";


const router = createBrowserRouter([
  {
    children: [BaseRoutes,DashboardRoutes],
  },
]);

export default router;
