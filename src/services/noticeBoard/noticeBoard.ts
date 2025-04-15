import { NoticeResponseDTO, PaginatedResponse, ResponseDTO } from "../../models";
import { apiErrorHandler } from "../../utils";
import { api } from "../api.ts";
import { CreateNoticesRequestDTO, UpdateNoticeRequestDTO } from "./noticeBoard.types.ts";

class NoticeBoardService {
  public static readonly url = "/v1/aviso";

  public static async getNotices(): Promise<PaginatedResponse<NoticeResponseDTO[]>> {
    return apiErrorHandler(() =>
      api
        .get<PaginatedResponse<NoticeResponseDTO[]>>(NoticeBoardService.url, {
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }

  public static async getNotice(id: number): Promise<ResponseDTO<NoticeResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .get<PaginatedResponse<NoticeResponseDTO>>(`${NoticeBoardService.url}/${id}`)
        .then((response) => response.data),
    );
  }

  public static async createNotices(
    data: CreateNoticesRequestDTO,
  ): Promise<ResponseDTO<NoticeResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .post<ResponseDTO<NoticeResponseDTO>>(NoticeBoardService.url, data, {
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }

  public static async updateNotice(
    data: UpdateNoticeRequestDTO,
  ): Promise<ResponseDTO<NoticeResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .put<ResponseDTO<NoticeResponseDTO>>(`${NoticeBoardService.url}/${data.id}`, data, {
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }

  public static async deleteNotice(id: number): Promise<void> {
    return apiErrorHandler(() =>
      api
        .delete<void>(`${NoticeBoardService.url}/${id}`, {
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }
}

export { NoticeBoardService };
