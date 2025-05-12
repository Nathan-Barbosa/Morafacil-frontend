import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { APIError, GetParcelsResponseDTO, PaginatedResponse, ResponseDTO } from "../../models";
import { PatchPickupParcelRequestDTO, PostParcelRequestDTO } from "./ParcelsService.types";
import { ParcelsService } from "./ParcelsService";

const parcelsKeys = {
  all: ["parcels"] as const,
  list: (params: { pageNumber: number; pageSize: number }) => [...parcelsKeys.lists(), params] as const,
  lists: () => [...parcelsKeys.all, "list"] as const,
  postParcel: () => [...parcelsKeys.all, "postParcel"] as const,
  patchPickupParcel: () => [...parcelsKeys.all, "patchPickupParcel"] as const,
};

const useGetParcelsListQuery = (params: { pageNumber: number; pageSize: number }) => {
  return useQuery<PaginatedResponse<GetParcelsResponseDTO[]>, APIError>({
    queryKey: parcelsKeys.list(params), // se tiver cache com base nos parâmetros
    queryFn: () => ParcelsService.getParcels(params),
  });
};

const usePostParcelMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, APIError, PostParcelRequestDTO>({
    mutationKey: parcelsKeys.postParcel(),
    mutationFn: (data: PostParcelRequestDTO) => ParcelsService.postParcel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: parcelsKeys.lists(),
      });
    },
  });
};


const usePatchPickupParcelMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<GetParcelsResponseDTO>, APIError, PatchPickupParcelRequestDTO>({
    mutationKey: parcelsKeys.patchPickupParcel(),
    mutationFn: (data) => ParcelsService.patchPickupParcel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: parcelsKeys.lists(),
      });
    },
  });
};

const useGetParcelsByMeQuery = (params: { pageNumber: number; pageSize: number }) => {
  return useQuery<PaginatedResponse<GetParcelsResponseDTO[]>, APIError>({
    queryKey: [...parcelsKeys.all, "byme", params],
    queryFn: () => ParcelsService.getParcelsByMe(params),
  });
};


export { usePostParcelMutation, useGetParcelsListQuery, usePatchPickupParcelMutation, useGetParcelsByMeQuery };
