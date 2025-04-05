import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { APIError, GetParcelsResponseDTO, PaginatedResponse, ResponseDTO } from "../../models";
import { PostParcelRequestDTO } from "./ParcelsService.types";
import { ParcelsService } from "./ParcelsService";

const parcelsKeys = {
  all: ["parcels"] as const,
  lists: () => [...parcelsKeys.all, "list"] as const,
  postParcel: () => [...parcelsKeys.all, "postParcel"] as const,
  patchPickupParcel: () => [...parcelsKeys.all, "patchPickupParcel"] as const,
};

const useGetParcelsListQuery = () => {
  return useQuery<PaginatedResponse<GetParcelsResponseDTO[]>, APIError>({
    queryKey: parcelsKeys.lists(),
    queryFn: () => ParcelsService.getParcels(),
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

  return useMutation<ResponseDTO<GetParcelsResponseDTO>, APIError, number>({
    mutationKey: parcelsKeys.patchPickupParcel(),
    mutationFn: (encomendaId: number) => ParcelsService.patchPickupParcel(encomendaId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: parcelsKeys.lists(),
      }),
  });
};

export { usePostParcelMutation, useGetParcelsListQuery, usePatchPickupParcelMutation };
