import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers";

const ProtectedRoute = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export { ProtectedRoute };
