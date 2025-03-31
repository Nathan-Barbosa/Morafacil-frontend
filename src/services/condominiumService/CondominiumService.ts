import { PostCondominiumResponseDTO, ResponseDTO } from "../../models";
import { apiErrorHandler } from "../../utils";
import { api } from "../api.ts";
import { PostCreateCondominiumRequestDTO } from "./CondominiumService.types.ts";

class CondominiumService {
  public static readonly url = "/v1/condominio";

  public static async postCreateCondominium(
    data: PostCreateCondominiumRequestDTO,
  ): Promise<ResponseDTO<PostCondominiumResponseDTO>> {
    return apiErrorHandler(() =>
      api
        .post<ResponseDTO<PostCondominiumResponseDTO>>(`${CondominiumService.url}`,
          data)
        .then((response) => response.data),
    );
  }

  
}

export { CondominiumService };
