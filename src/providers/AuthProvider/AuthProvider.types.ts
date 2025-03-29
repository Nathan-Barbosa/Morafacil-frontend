import { UserResponseDTO } from "../../models";

type AuthContextType = {
  user: UserResponseDTO | null;
  setUser: (user: UserResponseDTO | null) => void;
  authenticated: boolean;
  loading: boolean;
};

export type { AuthContextType };
