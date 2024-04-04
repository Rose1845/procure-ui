import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";

// import App from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
// import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
// Kommunicate.init("237e20e39226d97e50f5b081973a3ce0f", {
//   automaticChatOpenOnNavigation: true,
//   popupWidget: true
// });
// import { AuthProvider } from "./context/AuthProvider.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
