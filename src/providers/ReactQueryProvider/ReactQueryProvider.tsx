// ReactQueryProvider.tsx
import { useCallback, useMemo } from "react";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryProviderProps } from "./ReactQueryProvider.types";
import { APIError } from "../../models";
import { useToast } from "../ToastProvider";

const fiveMinutes = 1000 * 60 * 5;

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const { toast } = useToast();

  const onError = useCallback(
    (error: Error) => {
      if (!(error instanceof APIError)) return;
      toast({
        title: "Erro",
        description: error.message,
        variant: "danger",
      });
    },
    [toast],
  );

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 1, staleTime: fiveMinutes } },
        queryCache: new QueryCache({ onError }),
        mutationCache: new MutationCache({ onError }),
      }),
    [onError],
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { ReactQueryProvider };
