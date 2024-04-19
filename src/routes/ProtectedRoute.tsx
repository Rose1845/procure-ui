import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  redirectPath?: string;
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { state } = useAuth()
  const location = useLocation()
  return state && state.token ? (
    <React.Fragment>
      {children}
    </React.Fragment>) :
    <Navigate to={'/login'} state={{ from: location.pathname }} />
}
export default ProtectedRoute;


