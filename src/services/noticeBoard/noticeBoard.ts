import { NoticeResponseDTO, PaginatedResponse } from "../../models";
import { apiErrorHandler } from "../../utils";
import { api } from "../api.ts";

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
}

export { NoticeBoardService };
