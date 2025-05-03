import { ResponseDTO, UserResponseDTO } from "../../models";
import { apiErrorHandler } from "../../utils";
import { api } from "../api.ts";
import { AssociateCondominiumDTO, BlockUserRequestDTO } from "./UsersService.types.ts";

class UsersService {
  public static readonly url = "/v1/identity";

  public static async getUsers(role: string): Promise<ResponseDTO<UserResponseDTO[]>> {
    return apiErrorHandler(() =>
      api
        .get<ResponseDTO<UserResponseDTO[]>>(`${UsersService.url}/users`, {
          params: { role: role || undefined },
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }

  public static async blockUser(data: BlockUserRequestDTO): Promise<ResponseDTO<string>> {
    return apiErrorHandler(() =>
      api
        .post<ResponseDTO<string>>(`${UsersService.url}/block-user`, data)
        .then((response) => response.data),
    );
  }

  public static async associateCondominium(
    data: AssociateCondominiumDTO
  ): Promise<ResponseDTO<string>> {
    return apiErrorHandler(() =>
      api
        .post<ResponseDTO<string>>(
          `${UsersService.url}/users/associate-condominio`,
          data
        )
        .then((res) => res.data)
    );
  }
}

export { UsersService };
