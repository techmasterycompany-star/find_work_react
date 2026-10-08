import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RequireAuth() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) return null; 

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

export function RedirectIfAuthenticated({ children }) {
  const { isAuthenticated, role, isInitializing } = useAuth();

  if (isInitializing) return null;
  if (isAuthenticated)
    return (
      <Navigate to={role === "employer" ? "/employer" : "/candidate"} replace />
    );

  return children;
}
