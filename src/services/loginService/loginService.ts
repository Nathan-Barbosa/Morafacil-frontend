import { ResponseDTO } from '../../models/Response.types.ts';
import { apiErrorHandler } from '../../utils/apiErrorHandler.ts';
import { api } from '../api.ts';
import { PostLoginRequestDTO } from './loginService.types.ts';

class LoginService {
  public static readonly url = '/v1/identity/login';

  public static async postLogin(data: PostLoginRequestDTO): Promise<ResponseDTO<string>> {
    return apiErrorHandler(() =>
      api
        .post<ResponseDTO<string>>(LoginService.url, data, { withCredentials: true })
        .then((response) => response.data),
    );
  }
}

export { LoginService };
