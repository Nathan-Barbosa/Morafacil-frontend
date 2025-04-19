import { FinesResponseDTO, PaginatedResponse, ResponseDTO } from "../../models";
import { apiErrorHandler } from "../../utils/index.ts";
import { api } from "../api.ts";
import { FineRequestDTO, GetFinesRequestDTO, UpdateFineRequestDTO } from "./fines.types.ts";

class FinesService {
  public static readonly url = "/v1/Multa";

  public static async getFines({
    pageNumber,
    pageSize,
  }: GetFinesRequestDTO): Promise<PaginatedResponse<FinesResponseDTO[]>> {
    return apiErrorHandler(() =>
      api
        .get<PaginatedResponse<FinesResponseDTO[]>>(FinesService.url, {
          params: { pageNumber: pageNumber || undefined, pageSize: pageSize || undefined },
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }

  public static async getFine(id: number): Promise<ResponseDTO<FinesResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .get<ResponseDTO<FinesResponseDTO>>(`${FinesService.url}/${id}`, {
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }

  public static async createFine(data: FineRequestDTO): Promise<ResponseDTO<FinesResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .post<ResponseDTO<FinesResponseDTO>>(FinesService.url, data, {
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }

  public static async updateFine(
    data: UpdateFineRequestDTO,
  ): Promise<ResponseDTO<FinesResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .post<ResponseDTO<FinesResponseDTO>>(FinesService.url, data, {
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }

  public static async deleteFine(id: number): Promise<void> {
    return apiErrorHandler(() =>
      api
        .delete<Promise<void>>(FinesService.url, {
          data: id,
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }
}

export { FinesService };
