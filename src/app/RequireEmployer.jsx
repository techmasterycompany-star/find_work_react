import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

export function RequireEmployer() {
  const { isAuthenticated, role, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) return null;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  if (role !== 'employer') {
    
    return (
      <Navigate
        to={role === 'candidate' ? '/candidate' : '/'}
        replace
        state={{ from: location, notAuthorised: true }}
      />
    );
  }

  return <Outlet />;
}
