import React from "react";
import { sidebarLinks } from "../data/links";
import { NavLink, useLocation } from "react-router-dom";

function AdminSidebar() {
  const routePath = useLocation().pathname;

  return (
    <div>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-blue-600 ">
          <ul className="space-y-2 font-medium">
            {sidebarLinks.map(({ label, path, LinkIcon }) =>
              LinkIcon ? (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 ${
                      isActive && routePath === path ? "bg-gray-100" : ""
                    }`
                  }
                >
                  <LinkIcon />
                  <span>{label}</span>
                </NavLink>
              ) : (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100${
                      isActive && routePath === path ? "bg-gray-100" : ""
                    }`
                  }
                >
                  <span className="ms-3">{label}</span>
                </NavLink>
              )
            )}{" "}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default AdminSidebar;
