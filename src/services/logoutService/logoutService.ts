import { ResponseDTO } from "../../models/Response.types.ts";
import { apiErrorHandler } from "../../utils/apiErrorHandler.ts";
import { api } from "../api.ts";

class LogoutService {
  public static readonly url = "/v1/identity/logout";

  public static async postLogout(): Promise<ResponseDTO<string>> {
    return apiErrorHandler(() =>
      api
        .post<ResponseDTO<string>>(LogoutService.url, {}, { withCredentials: true })
        .then((response) => response.data),
    );
  }
}

export { LogoutService };
