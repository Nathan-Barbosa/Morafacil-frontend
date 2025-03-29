import { createContext, useContext } from "react";
import { AuthContextType } from "./AuthProvider.types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export { useAuth };
