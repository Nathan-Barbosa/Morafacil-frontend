import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5068/v1/identity/me', {
          credentials: 'include',
        });

        const json = await res.json();

        if (res.ok && json.code === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export { ProtectedRoute };
