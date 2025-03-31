import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  APIError,
  GetCondominiumResponseDTO,
  PaginatedResponse,
  PostCondominiumResponseDTO,
  ResponseDTO,
} from "../../models";
import {
  GetCondominiumRequestDTO,
  PostCreateCondominiumRequestDTO,
} from "./CondominiumService.types";
import { CondominiumService } from "./CondominiumService";

const condominiumKeys = {
  all: ["condominium"] as const,
  lists: () => [...condominiumKeys.all, "list"] as const,
  list: (params: GetCondominiumRequestDTO) => [...condominiumKeys.lists(), params] as const,
  createCondo: () => [...condominiumKeys.all, "createCondo"] as const,
};

const useGetCondosListQuery = (params: GetCondominiumRequestDTO) => {
  return useQuery<PaginatedResponse<GetCondominiumResponseDTO[]>, APIError>({
    queryKey: condominiumKeys.list(params),
    queryFn: () => CondominiumService.getCondos(params),
  });
};

const usePostCreateCondominiumMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ResponseDTO<PostCondominiumResponseDTO>,
    APIError,
    PostCreateCondominiumRequestDTO
  >({
    mutationKey: condominiumKeys.createCondo(),
    mutationFn: (data: PostCreateCondominiumRequestDTO) =>
      CondominiumService.postCreateCondominium(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: condominiumKeys.lists(),
      }),
  });
};

export { usePostCreateCondominiumMutation, useGetCondosListQuery };
