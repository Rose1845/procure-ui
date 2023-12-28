import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "./pages/base/layout/BaseLayout";
import BaseRoutes from "./routes/base";
import AdminRoutes from "./routes/dashboard";


const router = createBrowserRouter([
  {
    children: [BaseRoutes,AdminRoutes],
  },
]);

export default router;
