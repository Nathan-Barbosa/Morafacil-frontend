import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { APIError, ResponseDTO } from "../../models";
import { RoleService } from "./RoleService";
import { PostAssignRoleRequestDTO } from "./RoleService.types";

const rolesKeys = {
  all: ["roles"] as const,
  lists: () => [...rolesKeys.all, "list"] as const,
  associateUser: () => [...rolesKeys.all, "associateUser"] as const,
};

const useGetRolesListQuery = () => {
  return useQuery<ResponseDTO<string[]>, APIError>({
    queryKey: rolesKeys.lists(),
    queryFn: () => RoleService.getRoles(),
  });
};

const usePostAssignRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<string>, APIError, PostAssignRoleRequestDTO>({
    mutationKey: rolesKeys.associateUser(),
    mutationFn: (data: PostAssignRoleRequestDTO) => RoleService.postAssignRole(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: rolesKeys.lists(),
      }),
  });
};

export { useGetRolesListQuery, usePostAssignRoleMutation };
