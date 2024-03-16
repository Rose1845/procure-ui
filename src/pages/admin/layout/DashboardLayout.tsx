import React from "react";
import AdminLayout from "./AdminLayout";
import { Outlet } from "react-router-dom";

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
