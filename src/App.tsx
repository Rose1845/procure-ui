import "./App.css";
// import { RouterProvider } from "react-router-dom";
// import router from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
// import { RouterProvider } from "react-router-dom";
// import router from "./router";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import TawkToChatScript from "./pages/base/components/TawkToChatScript";
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
          <ToastContainer />
        <TawkToChatScript />
      </QueryClientProvider>

    </>
  );
}

export default App;
