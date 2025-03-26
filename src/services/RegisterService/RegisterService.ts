import { apiErrorHandler } from '../../utils/apiErrorHandler.ts';
import { api } from '../api.ts';
import { PostRegisterRequestDTO } from './RegisterService.types.ts';

class RegisterService {
  public static readonly url = '/v1/identity/register';

  public static async postRegister(data: PostRegisterRequestDTO): Promise<void> {
    return apiErrorHandler(() =>
      api.post<void>(RegisterService.url, data).then((response) => response.data),
    );
  }
}

export { RegisterService };
