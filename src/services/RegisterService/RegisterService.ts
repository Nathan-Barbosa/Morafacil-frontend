import { api } from '../api.ts';
import { PostRegisterRequestDTO } from './RegisterService.types.ts';

class RegisterService {
  public static readonly url = '/v1/identity/register';

  public static postRegister(data: PostRegisterRequestDTO): Promise<void> {
    return api.post<void>(RegisterService.url, data).then((response) => response.data);
  }
}

export { RegisterService };
