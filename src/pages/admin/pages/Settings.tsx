import React from "react";
import ChangePasswordForm from "../components/accounts/ChangePasswordForm";
import Roles from "./Roles";

function Settings() {
  return (
    <div className="py-16 max-w-7xl m-auto">
      <ChangePasswordForm />
      <Roles/>
    </div>
  );
}

export default Settings;
