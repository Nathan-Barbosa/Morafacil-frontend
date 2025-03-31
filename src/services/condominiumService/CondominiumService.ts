import {
  GetCondominiumResponseDTO,
  PaginatedResponse,
  PostCondominiumResponseDTO,
  ResponseDTO,
} from "../../models";
import { apiErrorHandler } from "../../utils";
import { api } from "../api.ts";
import {
  GetCondominiumRequestDTO,
  PostCreateCondominiumRequestDTO,
} from "./CondominiumService.types.ts";

class CondominiumService {
  public static readonly url = "/v1/condominio";

  public static async getCondos({
    pageNumber,
    pageSize,
  }: GetCondominiumRequestDTO): Promise<PaginatedResponse<GetCondominiumResponseDTO[]>> {
    return apiErrorHandler(() =>
      api
        .get<PaginatedResponse<GetCondominiumResponseDTO[]>>(CondominiumService.url, {
          params: { pageNumber: pageNumber || undefined, pageSize: pageSize || undefined },
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }

  public static async postCreateCondominium(
    data: PostCreateCondominiumRequestDTO,
  ): Promise<ResponseDTO<PostCondominiumResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .post<ResponseDTO<PostCondominiumResponseDTO>>(`${CondominiumService.url}`, data)
        .then((response) => response.data),
    );
  }
}

export { CondominiumService };
