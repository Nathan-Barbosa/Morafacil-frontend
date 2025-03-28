type User = {
  id: string;
  email: string;
  roles: string[];
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  authenticated: boolean;
  loading: boolean;
};

export type { AuthContextType, User };
