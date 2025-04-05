import { GetParcelsResponseDTO } from "../../models/index.ts";
import { PaginatedResponse, ResponseDTO } from "../../models/Response.types.ts";
import { apiErrorHandler } from "../../utils/apiErrorHandler.ts";
import { api } from "../api.ts";
import { PostParcelRequestDTO } from "./ParcelsService.types.ts";

class ParcelsService {
  public static readonly url = "/v1/encomenda";

  public static async getParcels(): Promise<PaginatedResponse<GetParcelsResponseDTO[]>> {
    return apiErrorHandler(() =>
      api
        .get<PaginatedResponse<GetParcelsResponseDTO[]>>(ParcelsService.url)
        .then((response) => response.data),
    );
  }

  public static async postParcel(data: PostParcelRequestDTO): Promise<void> {
    return apiErrorHandler(() =>
      api.post<void>(ParcelsService.url, data).then((response) => response.data),
    );
  }

  public static async patchPickupParcel(
    encomendaId: number,
  ): Promise<ResponseDTO<GetParcelsResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .patch<ResponseDTO<GetParcelsResponseDTO>>(`${ParcelsService.url}/retirar`, { encomendaId })
        .then((response) => response.data),
    );
  }
}

export { ParcelsService };
