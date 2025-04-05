import { apiErrorHandler } from "../../utils/apiErrorHandler.ts";
import { api } from "../api.ts";
import { PostParcelRequestDTO } from "./ParcelsService.types.ts";

class ParcelsService {
  public static readonly url = "/v1/encomenda";

  public static async postParcel(data: PostParcelRequestDTO): Promise<void> {
    return apiErrorHandler(() =>
      api.post<void>(ParcelsService.url, data).then((response) => response.data),
    );
  }
}

export { ParcelsService };
