import ListUsers from "../components/user/ListUsers";
import Roles from "./Roles";

function Settings() {
  return (
    <div className="py-16 max-w-7xl m-auto">
      <Roles/>
      <ListUsers/>
    </div>
  );
}

export default Settings;
