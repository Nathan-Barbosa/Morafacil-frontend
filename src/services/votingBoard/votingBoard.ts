import {
  GetVotingResponseDTO,
  PaginatedResponse,
  ResponseDTO,
  VotingResponseDTO,
} from "../../models/index.ts";
import { apiErrorHandler } from "../../utils/index.ts";
import { api } from "../api.ts";
import { GetVotingsRequestDTO, VotingRequestDTO } from "./votingBoard.types.ts";

class VotingBoardService {
  public static readonly url = "/v1/votacao";

  public static async getVotings({
    pageNumber,
    pageSize,
  }: GetVotingsRequestDTO): Promise<PaginatedResponse<GetVotingResponseDTO[]>> {
    return apiErrorHandler(() =>
      api
        .get<PaginatedResponse<GetVotingResponseDTO[]>>(VotingBoardService.url, {
          params: { pageNumber: pageNumber || undefined, pageSize: pageSize || undefined },
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }

  public static async createVoting(
    data: VotingRequestDTO,
  ): Promise<ResponseDTO<VotingResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .post<ResponseDTO<VotingResponseDTO>>(VotingBoardService.url, data, {
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }

  // public static async updateVoting(
  //   data: UpdateNoticeRequestDTO,
  // ): Promise<ResponseDTO<NoticeResponseDTO>> {
  //   return apiErrorHandler(() =>
  //     api
  //       .put<ResponseDTO<NoticeResponseDTO>>(`${VotingBoardService.url}/${data.id}`, data, {
  //         withCredentials: true,
  //       })
  //       .then((response) => response.data),
  //   );
  // }

  public static async closeVoting(id: number): Promise<ResponseDTO<boolean>> {
    return apiErrorHandler(() =>
      api
        .patch<ResponseDTO<boolean>>(`${VotingBoardService.url}/${id}/encerrar`, {
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }
}

export { VotingBoardService };
