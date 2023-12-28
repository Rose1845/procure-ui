import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const contextValue = useContext(AuthContext);
  const auth = contextValue?.auth; // Use optional chaining here
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
  return auth;
};

export default useAuth;
