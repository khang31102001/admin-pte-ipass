import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface RequireAuthProps {
  children: React.ReactElement;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
