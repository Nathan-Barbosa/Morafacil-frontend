import { useMutation } from "@tanstack/react-query";

import { APIError, ResponseDTO } from "../../models";
import { PostLoginRequestDTO } from "./loginService.types";
import { LoginService } from "./loginService";

const loginKeys = {
  all: ["login"] as const,
  login: () => [...loginKeys.all, "login"] as const,
};

const usePostLoginMutation = () => {
  return useMutation<ResponseDTO<string>, APIError, PostLoginRequestDTO>({
    mutationKey: loginKeys.login(),
    mutationFn: (data: PostLoginRequestDTO) => LoginService.postLogin(data),
  });
};

export { usePostLoginMutation };
