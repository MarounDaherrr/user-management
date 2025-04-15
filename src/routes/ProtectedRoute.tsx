import React from "react";
import { Navigate } from "react-router-dom";
import { useSessionStore } from "../stores/sessionStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useSessionStore((s) => s.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
