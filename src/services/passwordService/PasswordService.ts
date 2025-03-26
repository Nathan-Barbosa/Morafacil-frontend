import { apiErrorHandler } from '../../utils/apiErrorHandler.ts';
import { api } from '../api.ts';
import { PostForgotPasswordRequestDTO } from './PasswordService.types.ts';

class ForgotPasswordService {
  public static readonly url = '/v1/identity/forgot-password';

  public static async postForgotPassword(data: PostForgotPasswordRequestDTO): Promise<void> {
    return apiErrorHandler(() =>
      api.post<void>(ForgotPasswordService.url, data).then((response) => response.data),
    );
  }
}

export { ForgotPasswordService };
