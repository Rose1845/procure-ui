import useAuth from "@/hooks/useAuth";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

interface AuthorityProps {
  children: React.ReactNode;
  perm: UserAuthorityType;
}

type UserAuthorityType = "ADMIN" | "EMPLOYEE";

function AuthorityRoute({ children, perm }: AuthorityProps) {
  const { state } = useAuth();
  const userHasAuthorities = state?.user.authorities.map((a) => a.authority);

  return (
    <ProtectedRoute>
      {userHasAuthorities?.includes(perm) ? (
        children
      ) : (
        <Navigate to={"/"} replace />
      )}
    </ProtectedRoute>
  );
  //  userHasAuthority ? <>{children}</> : <div>Not Authorized! Contact Admin</div>;
}

export default AuthorityRoute;
