import BaseLayout from "./BaseLayout";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div>
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    </div>
  );
}

export default HomeLayout;
