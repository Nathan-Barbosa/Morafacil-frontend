import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../providers';

const ProtectedRoute = () => {
  const { authenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export { ProtectedRoute };
