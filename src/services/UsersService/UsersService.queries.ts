import { useMutation, useQuery } from "@tanstack/react-query";

import { APIError, ResponseDTO, UserResponseDTO } from "../../models";
import { UsersService } from "./UsersService";
import { BlockUserRequestDTO } from "./UsersService.types";

const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (role: string) => [...usersKeys.lists(), role] as const,
  block: () => [...usersKeys.all, "block"] as const,
};

const useGetUsersListQuery = (role?: string) => {
  return useQuery<ResponseDTO<UserResponseDTO[]>, APIError>({
    queryKey: usersKeys.list(role || ""),
    queryFn: () => UsersService.getUsers(role || ""),
  });
};

const usePostBlockUserMutation = () => {
  return useMutation<ResponseDTO<string>, APIError, BlockUserRequestDTO>({
    mutationKey: usersKeys.block(),
    mutationFn: (data: BlockUserRequestDTO) => UsersService.blockUser(data),
  });
};

export { useGetUsersListQuery, usePostBlockUserMutation };
