import React from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AdminHeader />
      {children}
      <AdminSidebar />
    </div>
  );
}

export default AdminLayout;
