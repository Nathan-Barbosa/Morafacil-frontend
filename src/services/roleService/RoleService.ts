import { ResponseDTO } from "../../models/index.ts";
import { apiErrorHandler } from "../../utils/index.ts";
import { api } from "../api.ts";
import { PostAssignRoleRequestDTO } from "./RoleService.types.ts";

class RoleService {
  public static readonly url = "/v1/identity/roles";

  public static async getRoles(email?: string): Promise<ResponseDTO<string[]>> {
    return apiErrorHandler(() =>
      api
        .get<ResponseDTO<string[]>>(RoleService.url, {
          params: email ? email : undefined,
          withCredentials: true,
        })
        .then((response) => response.data),
    );
  }

  public static async postAssignRole({
    userEmail,
    roleName,
    action,
  }: PostAssignRoleRequestDTO): Promise<ResponseDTO<string>> {
    return apiErrorHandler(() =>
      api
        .post<ResponseDTO<string>>(`${RoleService.url}/assign`, {
          userEmail,
          roleName,
          action,
        })
        .then((response) => response.data),
    );
  }
}

export { RoleService };
