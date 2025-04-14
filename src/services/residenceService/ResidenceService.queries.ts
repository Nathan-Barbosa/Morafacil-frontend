import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { APIError, PaginatedResponse, ResidenceResponseDTO, ResponseDTO } from "../../models";
import { ResidenceService } from "./ResidenceService";
import {
  GetResidencesRequestDTO,
  PatchAssociateUserRequestDTO,
  PatchRemoveUserRequestDTO,
  PostCreateResidenceRequestDTO,
  PutUpdateResidenceRequestDTO,
} from "./ResidenceService.types";

const residencesKeys = {
  all: ["residences"] as const,
  lists: () => [...residencesKeys.all, "list"] as const,
  list: (params: GetResidencesRequestDTO) => [...residencesKeys.lists(), params] as const,
  associateUser: () => [...residencesKeys.all, "associateUser"] as const,
  createResidence: () => [...residencesKeys.all, "createResidence"] as const,
  removeUser: () => [...residencesKeys.all, "removeUser"] as const,
  getResidence: (id: number) => [...residencesKeys.all, "getResidence", id] as const,
  deleteResidence: () => [...residencesKeys.all, "deleteResidence"] as const,
  updateResidence: () => [...residencesKeys.all, "updateResidence"] as const,
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

const usePatchRemoveUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, APIError, PatchRemoveUserRequestDTO>({
    mutationKey: residencesKeys.removeUser(),
    mutationFn: (params) => ResidenceService.patchRemoveUser(params),
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

const useGetResidenceQuery = (id: number) => {
  return useQuery<ResponseDTO<ResidenceResponseDTO>, APIError>({
    queryKey: residencesKeys.getResidence(id),
    queryFn: () => ResidenceService.getResidence(id),
    enabled: !!id,
  });
};

const useDeleteResidenceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<string>, APIError, number>({
    mutationKey: residencesKeys.deleteResidence(),
    mutationFn: (id: number) => ResidenceService.deleteResidence(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: residencesKeys.lists(),
      });
    },
  });
};

const usePutResidenceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<string>, APIError, PutUpdateResidenceRequestDTO>({
    mutationKey: residencesKeys.updateResidence(),
    mutationFn: (data: PutUpdateResidenceRequestDTO) => ResidenceService.putUpdateResidence(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: residencesKeys.lists(),
      });
    },
  });
};

export {
  useGetResidencesListQuery,
  usePatchAssociateUserMutation,
  usePostCreateResidenceMutation,
  usePatchRemoveUserMutation,
  useGetResidenceQuery,
  useDeleteResidenceMutation,
  usePutResidenceMutation,
};
