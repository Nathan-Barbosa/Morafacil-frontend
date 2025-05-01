import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers";

const ProtectedRoute = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-blue-600 text-lg font-medium">Verificando acesso...</span>
      </div>
    );
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export { ProtectedRoute };
