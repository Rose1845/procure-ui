import React from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import ProtectedRoute from "@/routes/ProtectedRoute";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AdminHeader />
      <div className="">
        {children}
      </div>
      <AdminSidebar />
    </ProtectedRoute>
  );
}

export default AdminLayout;
