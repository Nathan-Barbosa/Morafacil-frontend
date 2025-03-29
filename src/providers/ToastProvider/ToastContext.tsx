import { createContext, useContext } from "react";
import { IToast } from "./ToasProvider.types";

export type ToastContextData = {
  toast: (toast: IToast) => void;
};

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser utilizado dentro de um ToastProvider");
  }
  return context;
}

export { ToastContext };
