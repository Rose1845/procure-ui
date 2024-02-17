import React from "react";
import PublicLayout from "./layout/PublicLayout";
import { Outlet } from "react-router-dom";

export default function PublicViewLayout() {
  return (
    <div>
      <PublicLayout>
        <Outlet />
      </PublicLayout>
    </div>
  );
}
