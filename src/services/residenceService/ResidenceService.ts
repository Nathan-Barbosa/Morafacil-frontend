import { PaginatedResponse, ResidenceResponseDTO } from "../../models";
import { apiErrorHandler } from "../../utils";
import { api } from "../api.ts";
import { GetResidencesRequestDTO, PatchAssociateUserRequestDTO } from "./ResidenceService.types.ts";

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
}

export { ResidenceService };
