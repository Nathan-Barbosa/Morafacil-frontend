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
  PatchCondominiumStatusRequestDTO,
  CondominiumRequestDTO,
} from "./CondominiumService.types";
import { CondominiumService } from "./CondominiumService";

const condominiumKeys = {
  all: ["condominium"] as const,
  lists: () => [...condominiumKeys.all, "list"] as const,
  list: (params: GetCondominiumRequestDTO) => [...condominiumKeys.lists(), params] as const,
  createCondo: () => [...condominiumKeys.all, "createCondo"] as const,
  updateCondo: () => [...condominiumKeys.all, "updateCondo"] as const,
  deleteCondo: () => [...condominiumKeys.all, "deleteCondo"] as const,
  updateCondoStatus: () => [...condominiumKeys.all, "updateCondoStatus"] as const,
};

const useGetCondosListQuery = (params: GetCondominiumRequestDTO) => {
  return useQuery<PaginatedResponse<GetCondominiumResponseDTO[]>, APIError>({
    queryKey: condominiumKeys.list(params),
    queryFn: () => CondominiumService.getCondos(params),
  });
};

const usePostCreateCondominiumMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<PostCondominiumResponseDTO>, APIError, CondominiumRequestDTO>({
    mutationKey: condominiumKeys.createCondo(),
    mutationFn: (data: CondominiumRequestDTO) => CondominiumService.postCreateCondominium(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: condominiumKeys.lists(),
      }),
  });
};

const useUpdateCondominiumMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<GetCondominiumResponseDTO>, APIError, CondominiumRequestDTO>({
    mutationKey: condominiumKeys.updateCondo(),
    mutationFn: (data: CondominiumRequestDTO) => CondominiumService.putUpdateCondominium(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: condominiumKeys.lists(),
      }),
  });
};

const useDeleteCondoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<string>, APIError, number>({
    mutationKey: condominiumKeys.deleteCondo(),
    mutationFn: (id: number) => CondominiumService.deleteCondo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: condominiumKeys.lists(),
      });
    },
  });
};

const usePatchCondoStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<string>, APIError, PatchCondominiumStatusRequestDTO>({
    mutationKey: condominiumKeys.updateCondoStatus(),
    mutationFn: (data: PatchCondominiumStatusRequestDTO) =>
      CondominiumService.updateCondoStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: condominiumKeys.lists(),
      });
    },
  });
};
export {
  usePostCreateCondominiumMutation,
  useGetCondosListQuery,
  useDeleteCondoMutation,
  usePatchCondoStatusMutation,
  useUpdateCondominiumMutation,
};
