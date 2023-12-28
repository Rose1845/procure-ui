import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface AuthContextType {
  auth: any; // Replace with the actual type
  setAuth: Dispatch<SetStateAction<any>>;
  // persist: boolean;
  // setPersist: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<any>({});
  // const [persist, setPersist] = useState<boolean>(
  //   JSON.parse(localStorage.getItem("persist")) || false
  // );

  return (
    <AuthContext.Provider value={{ auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
