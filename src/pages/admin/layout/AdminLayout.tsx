import React from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AdminHeader id={0} organization={null} email={""} username={""} firstname={""} lastname={""} avatar={""} roles={[]} enabled={false} authorities={[]} accountNonExpired={false} accountNonLocked={false} credentialsNonExpired={false} />
      <div className="">
        {children}
      </div>
      <AdminSidebar />
    </div>
  );
}

export default AdminLayout;
