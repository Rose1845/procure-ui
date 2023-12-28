import React from "react";
import AdminLayout from "../layout/AdminLayout";
import { Outlet } from "react-router-dom";
import Contact from "../../base/components/Contact";

function Dashboard() {
  return (
    <div>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </div>
  );
}

export default Dashboard;
