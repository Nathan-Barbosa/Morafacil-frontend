import { PaginatedResponse, ResidenceResponseDTO, ResponseDTO } from "../../models";
import { apiErrorHandler } from "../../utils";
import { api } from "../api.ts";
import {
  GetResidencesRequestDTO,
  PatchAssociateUserRequestDTO,
  PatchRemoveUserRequestDTO,
  PostCreateResidenceRequestDTO,
  PutUpdateResidenceRequestDTO,
} from "./ResidenceService.types.ts";

class ResidenceService {
  public static readonly url = "/v1/residencia";

  public static async getResidences({
    pageNumber,
    pageSize,
  }: GetResidencesRequestDTO): Promise<PaginatedResponse<ResidenceResponseDTO[]>> {
    return apiErrorHandler(() =>
      api
        .get<PaginatedResponse<ResidenceResponseDTO[]>>(ResidenceService.url, {
          params: { pageNumber: pageNumber || undefined, pageSize: pageSize || undefined },
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }

  public static async patchAssociateUser({
    residenciaId,
    usuarioId,
  }: PatchAssociateUserRequestDTO): Promise<void> {
    return apiErrorHandler(() =>
      api
        .patch<void>(`${ResidenceService.url}/associateuser`, {
          residenciaId,
          usuarioId,
        })
        .then((response) => response.data),
    );
  }

  public static async patchRemoveUser({
    residenciaId,
    usuarioId,
  }: PatchRemoveUserRequestDTO): Promise<void> {
    return apiErrorHandler(() =>
      api
        .patch<void>(`${ResidenceService.url}/removeuser`, {
          residenciaId,
          usuarioId,
        })
        .then((response) => response.data),
    );
  }

  public static async postCreateResidence(
    data: PostCreateResidenceRequestDTO,
  ): Promise<ResponseDTO<ResidenceResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .post<ResponseDTO<ResidenceResponseDTO>>(ResidenceService.url, data)
        .then((response) => response.data),
    );
  }

  public static async getResidence(id: number): Promise<ResponseDTO<ResidenceResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .get<ResponseDTO<ResidenceResponseDTO>>(`${ResidenceService.url}/${id}`)
        .then((response) => response.data),
    );
  }

  public static async deleteResidence(id: number): Promise<ResponseDTO<string>> {
    return apiErrorHandler(() =>
      api
        .delete<ResponseDTO<string>>(`${ResidenceService.url}/${id}`)
        .then((response) => response.data),
    );
  }

  public static async putUpdateResidence(
    data: PutUpdateResidenceRequestDTO,
  ): Promise<ResponseDTO<string>> {
    return apiErrorHandler(() =>
      api
        .put<ResponseDTO<string>>(`${ResidenceService.url}/residencias/${data.id}`, data)
        .then((response) => response.data),
    );
  }
}

export { ResidenceService };
