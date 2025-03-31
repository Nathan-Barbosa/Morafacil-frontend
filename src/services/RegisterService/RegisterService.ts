import { ResponseDTO } from "../../models/Response.types.ts";
import { apiErrorHandler } from "../../utils/apiErrorHandler.ts";
import { api } from "../api.ts";
import { PostRegisterRequestDTO } from "./RegisterService.types.ts";

class RegisterService {
  public static readonly url = "/v1/identity/register";

  public static async postRegister(data: PostRegisterRequestDTO): Promise<ResponseDTO<string>> {
    return apiErrorHandler(() =>
      api.post<ResponseDTO<string>>(RegisterService.url, data).then((response) => response.data),
    );
  }
}

export { RegisterService };
