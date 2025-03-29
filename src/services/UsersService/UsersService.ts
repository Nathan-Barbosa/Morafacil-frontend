import { ResponseDTO, UserResponseDTO } from "../../models";
import { apiErrorHandler } from "../../utils";
import { api } from "../api.ts";

class UsersService {
  public static readonly url = "/v1/identity/users";

  public static async getUsers(role: string): Promise<ResponseDTO<UserResponseDTO[]>> {
    return apiErrorHandler(() =>
      api
        .get<ResponseDTO<UserResponseDTO[]>>(UsersService.url, {
          params: { role: role || undefined },
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }
}

export { UsersService };
