import React from "react";
import AdminLayout from "./AdminLayout";
import { Outlet } from "react-router-dom";
import Contact from "../../base/components/Contact";

function DashboardLayout() {
  return (
    <div>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </div>
  );
}

export default DashboardLayout;
