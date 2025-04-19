import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { APIError, FinesResponseDTO, PaginatedResponse, ResponseDTO } from "../../models";
import { GetFinesRequestDTO, FineRequestDTO, UpdateFineRequestDTO } from "./fines.types";
import { FinesService } from "./fines";

const finesKeys = {
  all: ["fines"] as const,
  lists: () => [...finesKeys.all, "list"] as const,
  list: (id: number) => [...finesKeys.lists(), id] as const,
  createFine: () => [...finesKeys.all, "createFine"] as const,
  updateFine: () => [...finesKeys.all, "updateFine"] as const,
  deleteFine: () => [...finesKeys.all, "deleteFine"] as const,
};

const useGetFinesQuery = (params: GetFinesRequestDTO) => {
  return useQuery<PaginatedResponse<FinesResponseDTO[]>, APIError>({
    queryKey: finesKeys.lists(),
    queryFn: () => FinesService.getFines(params),
  });
};

const useGetFineQuery = (id: number) => {
  return useQuery<ResponseDTO<FinesResponseDTO>, APIError, number>({
    queryKey: finesKeys.list(id),
    queryFn: () => FinesService.getFine(id),
  });
};

const usePostCreateFineMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<FinesResponseDTO>, APIError, FineRequestDTO>({
    mutationKey: finesKeys.createFine(),
    mutationFn: (data: FineRequestDTO) => FinesService.createFine(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: finesKeys.lists(),
      }),
  });
};

const usePutUpdateFineMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<FinesResponseDTO>, APIError, UpdateFineRequestDTO>({
    mutationKey: finesKeys.updateFine(),
    mutationFn: (data: UpdateFineRequestDTO) => FinesService.updateFine(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: finesKeys.lists(),
      }),
  });
};

const useDeleteFineMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, APIError, number>({
    mutationKey: finesKeys.deleteFine(),
    mutationFn: (id: number) => FinesService.deleteFine(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: finesKeys.lists(),
      }),
  });
};

export {
  useGetFinesQuery,
  usePostCreateFineMutation,
  useDeleteFineMutation,
  usePutUpdateFineMutation,
  useGetFineQuery,
};
