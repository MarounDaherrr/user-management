import React from "react";
import { Navigate } from "react-router-dom";
import { useSessionStore } from "../stores/sessionStore";

const AuthenticationRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useSessionStore((s) => s.accessToken);

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AuthenticationRoute;
