import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers";
import Loading from "../ui/loading";

const ProtectedRoute = () => {
  const { authenticated, loading } = useAuth();

  // Enquanto carrega, exibe um spinner centralizado na tela
  if (loading) {
    return (
      <Loading/>
    );
  }

  // Se estiver autenticado, renderiza as rotas internas; caso contrário, redireciona para login
  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export { ProtectedRoute };
