import React, { useEffect, useState } from 'react';
import { User } from './AuthProvider.types';
import { AuthContext } from './useAuth';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch('http://localhost:5068/v1/identity/me', {
          credentials: 'include',
        });
        const json = await res.json();

        if (res.ok && json.code === 200) {
          setUser(json.data);
          setAuthenticated(true);
        } else {
          setUser(null);
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setUser(null);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
