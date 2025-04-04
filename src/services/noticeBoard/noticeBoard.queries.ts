import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { APIError, NoticeResponseDTO, PaginatedResponse, ResponseDTO } from "../../models";
import { NoticeBoardService } from "./noticeBoard";
import { CreateNoticesRequestDTO, UpdateNoticeRequestDTO } from "./noticeBoard.types";

const noticeBoardsKeys = {
  all: ["notices"] as const,
  lists: () => [...noticeBoardsKeys.all, "list"] as const,
  // list: (role: string) => [...noticeBoardsKeys.lists(), role] as const,
  createNotice: () => [...noticeBoardsKeys.all, "createNotice"] as const,
  updateNotice: () => [...noticeBoardsKeys.all, "updateNotice"] as const,
  deleteNotice: () => [...noticeBoardsKeys.all, "deleteNotice"] as const,
};

const useGetNoticesQuery = () => {
  return useQuery<PaginatedResponse<NoticeResponseDTO[]>, APIError>({
    queryKey: noticeBoardsKeys.lists(),
    queryFn: () => NoticeBoardService.getNotices(),
  });
};

const usePostCreateNoticeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<NoticeResponseDTO>, APIError, CreateNoticesRequestDTO>({
    mutationKey: noticeBoardsKeys.createNotice(),
    mutationFn: (data: CreateNoticesRequestDTO) => NoticeBoardService.createNotices(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: noticeBoardsKeys.lists(),
      }),
  });
};

const usePutUpdateNoticeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<NoticeResponseDTO>, APIError, UpdateNoticeRequestDTO>({
    mutationKey: noticeBoardsKeys.updateNotice(),
    mutationFn: (data: UpdateNoticeRequestDTO) => NoticeBoardService.updateNotice(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: noticeBoardsKeys.lists(),
      }),
  });
};

const useDeleteNoticeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, APIError, number>({
    mutationKey: noticeBoardsKeys.deleteNotice(),
    mutationFn: (id: number) => NoticeBoardService.deleteNotice(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: noticeBoardsKeys.lists(),
      }),
  });
};

export {
  useGetNoticesQuery,
  usePostCreateNoticeMutation,
  useDeleteNoticeMutation,
  usePutUpdateNoticeMutation,
};
