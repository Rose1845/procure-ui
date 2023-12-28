import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  //  const fetchAllItems = async () => {
  //    const itemddata = await axios.get("http://localhost:8081/api/v1/items");
  //    const data = itemddata.data;
  //    console.log(data, "data");
  //  };
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
