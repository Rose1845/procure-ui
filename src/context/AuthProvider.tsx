import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
interface AuthContextType {
  auth: any; // Adjust this type according to the structure of your authentication data
  setAuth: Dispatch<SetStateAction<any>>;
  // persist: boolean;
  // setPersist: Dispatch<SetStateAction<boolean>>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState({});
  // const [persist, setPersist] = useState(
  //   JSON.parse(localStorage.getItem("persist")) || false
  // );

  return (
    <AuthContext.Provider value={{ auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
