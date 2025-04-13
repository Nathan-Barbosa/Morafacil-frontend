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
  PatchCondominiumStatusRequestDTO,
  CondominiumRequestDTO,
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
    data: CondominiumRequestDTO,
  ): Promise<ResponseDTO<PostCondominiumResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .post<ResponseDTO<PostCondominiumResponseDTO>>(`${CondominiumService.url}`, data)
        .then((response) => response.data),
    );
  }

  public static async putUpdateCondominium(
    data: CondominiumRequestDTO,
  ): Promise<ResponseDTO<GetCondominiumResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .put<ResponseDTO<GetCondominiumResponseDTO>>(`${CondominiumService.url}/${data?.id}`, data)
        .then((response) => response.data),
    );
  }

  public static async deleteCondo(id: number): Promise<ResponseDTO<string>> {
    return apiErrorHandler(() =>
      api
        .delete<ResponseDTO<string>>(`${CondominiumService.url}/${id}`)
        .then((response) => response.data),
    );
  }

  public static async getCondo(id: number): Promise<ResponseDTO<GetCondominiumResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .get<ResponseDTO<GetCondominiumResponseDTO>>(`${CondominiumService.url}/${id}`)
        .then((response) => response.data),
    );
  }

  public static async updateCondoStatus(
    data: PatchCondominiumStatusRequestDTO,
  ): Promise<ResponseDTO<string>> {
    return apiErrorHandler(() =>
      api
        .patch<ResponseDTO<string>>(`${CondominiumService.url}/status`, data)
        .then((response) => response.data),
    );
  }
}

export { CondominiumService };
