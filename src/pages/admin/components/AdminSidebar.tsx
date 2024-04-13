import React from "react";
import { sidebarLinks } from "../data/links";
import { NavLink, useLocation } from "react-router-dom";

function AdminSidebar() {
  const routePath = useLocation().pathname;
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false); // State to manage dropdown visibility

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <div>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-blue-600 ">
          <ul className="space-y-2 font-medium">
            {sidebarLinks.map(({ label, path, LinkIcon, children }) =>
              children ? (
                <li key={path} className="relative">
                  <button
                    type="button"
                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 "
                    onClick={handleDropdownToggle} 
                  >
                    {LinkIcon && <LinkIcon className="w-6 h-6 mr-3" />}
                    <span className="ml-3 text-left whitespace-nowrap">{label}</span> 
                    <svg
                      className={`w-6 h-6 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""
                        }`} 
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </button>
                  <ul
                    className={`${isDropdownOpen ? "block" : "hidden"
                      } py-2 space-y-2 pl-8 absolute top-10 left-0 w-full bg-blue-600 border-l border-gray-200`}
                  >
                    {children.map((childLink) => (
                      <li key={childLink.path}>
                        <NavLink
                          to={childLink.path}
                          className="flex items-center w-full p-1 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"
                        >
                          {childLink.LinkIcon && <childLink.LinkIcon className="w-6 h-6 mr-3" />}
                          <span>{childLink.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 ${isActive && routePath === path ? "bg-gray-100" : ""
                    }`
                  }
                >
                  {LinkIcon && <LinkIcon className="w-6 h-6 mr-3" />}
                  <span>{label}</span>
                </NavLink>
              )
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default AdminSidebar;
