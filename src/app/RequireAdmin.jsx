import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

export function RequireAdmin() {
  const { isAuthenticated, role, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) return null;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (role !== 'admin') {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location, notAuthorised: true }}
      />
    );
  }

  return <Outlet />;
}
