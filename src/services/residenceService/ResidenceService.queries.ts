import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { APIError, PaginatedResponse, ResidenceResponseDTO, ResponseDTO } from "../../models";
import { ResidenceService } from "./ResidenceService";
import {
  GetResidencesRequestDTO,
  PatchAssociateUserRequestDTO,
  PostCreateResidenceRequestDTO,
} from "./ResidenceService.types";

const residencesKeys = {
  all: ["residences"] as const,
  lists: () => [...residencesKeys.all, "list"] as const,
  list: (params: GetResidencesRequestDTO) => [...residencesKeys.lists(), params] as const,
  associateUser: () => [...residencesKeys.all, "associateUser"] as const,
  createResidence: () => [...residencesKeys.all, "createResidence"] as const,
};

const useGetResidencesListQuery = (params: GetResidencesRequestDTO) => {
  return useQuery<PaginatedResponse<ResidenceResponseDTO[]>, APIError>({
    queryKey: residencesKeys.list(params),
    queryFn: () => ResidenceService.getResidences(params),
  });
};

const usePatchAssociateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, APIError, PatchAssociateUserRequestDTO>({
    mutationKey: residencesKeys.associateUser(),
    mutationFn: (data: PatchAssociateUserRequestDTO) => ResidenceService.patchAssociateUser(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: residencesKeys.lists(),
      }),
  });
};

const usePostCreateResidenceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<ResidenceResponseDTO>, APIError, PostCreateResidenceRequestDTO>({
    mutationKey: residencesKeys.createResidence(),
    mutationFn: (data: PostCreateResidenceRequestDTO) => ResidenceService.postCreateResidence(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: residencesKeys.lists(),
      }),
  });
};

export { useGetResidencesListQuery, usePatchAssociateUserMutation, usePostCreateResidenceMutation };
