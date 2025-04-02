import { useQuery } from "@tanstack/react-query";

import { APIError, NoticeResponseDTO, PaginatedResponse } from "../../models";
import { NoticeBoardService } from "./noticeBoard";

const noticeBoardsKeys = {
  all: ["notices"] as const,
  lists: () => [...noticeBoardsKeys.all, "list"] as const,
  // list: (role: string) => [...noticeBoardsKeys.lists(), role] as const,
};

const useGetNoticesQuery = () => {
  return useQuery<PaginatedResponse<NoticeResponseDTO[]>, APIError>({
    queryKey: noticeBoardsKeys.lists(),
    queryFn: () => NoticeBoardService.getNotices(),
  });
};

export { useGetNoticesQuery };
