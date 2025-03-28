type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  authenticated: boolean;
  loading: boolean;
};

export type { AuthContextType, User };
