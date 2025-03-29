import { useMutation } from "@tanstack/react-query";

import { APIError, ResponseDTO } from "../../models";
import { LogoutService } from "./logoutService";
import { NavigateFunction } from "react-router-dom";

const logoutKeys = {
  all: ["logout"] as const,
  logout: () => [...logoutKeys.all, "logout"] as const,
};

const usePostLogoutMutation = (navigate: NavigateFunction) => {
  return useMutation<ResponseDTO<string>, APIError>({
    mutationKey: logoutKeys.logout(),
    mutationFn: () => LogoutService.postLogout(),
    onSuccess: (response) => {
      if (response.code === 200) {
        console.log("Logout realizado com sucesso");
        navigate("/login");
      }
    },
  });
};

export { usePostLogoutMutation };
