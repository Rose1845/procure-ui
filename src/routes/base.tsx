import React from "react";
import { RouteObject, Outlet } from "react-router-dom";
import Loader from "../loader";
import Dashboard from "../pages/admin/views/Dashboard";
import Home from "../pages/base/views/Home";


export const BaseRoutes: RouteObject = {
  path: "/",
  element: (
    <Home/>
    // <React.Suspense fallback={<Loader />}>
    //   <Outlet />
    // </React.Suspense>
  ),
//   children: [
//     {
//       path: "about",
//       element: <AboutUsPage />,
//     },
//     {
//       // path: "/",
//       index: true,
//       element: <LandingPage />,
//     },
//     {
//       path: "contact",
//       element: <ContactUsPage />,
//     },
//     {
//       path: "profile",
//       element: <Profile />,
//       children: [
//         {
//           path: "/profile",
//           element: <UserProfile />,
//         },
//         {
//           path: "/profile/settings",
//           element: <div>Settings</div>,
//         },
//         {
//           path: "/profile/orders",
//           element: <div>Orders</div>,
//         },
//         {
//           path: "/profile/wishlist",
//           element: <div>Wishlist</div>,
//         },
//         {
//           path: "/profile/edit",
//           element: <div>Edit Profile</div>,
//         },
//         {
//           path: "/profile/courses",
//           element: <div>Courses</div>,
//         },
//       ],
//     },
//     {
//       path: "login",
//       element: <LoginPage />,
//       action: loginAction,
//     },
//     {
//       path: "register",
//       element: <RegisterPage />,
//       //   action: registerAction,
//     },
 
//   ],
};

export default BaseRoutes;
