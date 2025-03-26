import { useMutation } from '@tanstack/react-query';

import { APIError } from '../../models';
import { PostForgotPasswordRequestDTO } from './PasswordService.types';
import { ForgotPasswordService } from './PasswordService';

const passwordKeys = {
  all: ['password'] as const,
  sendResetEmail: () => [...passwordKeys.all, 'sendResetEmail'] as const,
};

const usePostForgotPasswordMutation = () => {
  return useMutation<void, APIError, PostForgotPasswordRequestDTO>({
    mutationKey: passwordKeys.sendResetEmail(),
    mutationFn: (data: PostForgotPasswordRequestDTO) =>
      ForgotPasswordService.postForgotPassword(data),
  });
};

export { usePostForgotPasswordMutation };
