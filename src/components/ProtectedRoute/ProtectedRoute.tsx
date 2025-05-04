import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers";

const ProtectedRoute = () => {
  const { authenticated, loading } = useAuth();

  // Enquanto carrega, exibe um spinner centralizado na tela
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Spinner de carregamento */}
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

          {/* Mensagem */}
          <span className="text-blue-600 text-lg font-medium">Carregando...</span>
        </div>
      </div>
    );
  }

  // Se estiver autenticado, renderiza as rotas internas; caso contrário, redireciona para login
  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export { ProtectedRoute };
