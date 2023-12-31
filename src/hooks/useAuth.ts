import { useEffect, useState } from "react";

interface AuthData {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  getToken: () => string;
}

const useAuth = (): AuthData => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = () => {
    // Add your role checking logic here based on the actual JWT payload
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = parseJwt(token);
      console.log("Decoded Token:", decodedToken);

      if (decodedToken && decodedToken.role === "ADMIN") {
        setIsAdmin(true);
      }
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const getToken = () => localStorage.getItem("access_token") || "";

  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error parsing JWT:", error);
      return null;
    }
  };

  useEffect(() => {
    const loginToken = getToken();
    if (loginToken) {
      setIsAuthenticated(true);
      // Add your role checking logic here based on the actual JWT payload
      const decodedToken = parseJwt(loginToken);
      console.log("Decoded Token during initialization:", decodedToken);
      if (decodedToken && decodedToken.role === "ADMIN") {
        setIsAdmin(true);
      }
    }
  }, []);

  return {
    isAuthenticated,
    isAdmin,
    login,
    logout,
    getToken,
  };
};

export default useAuth;
