import { useMutation } from '@tanstack/react-query';
import { PostRegisterRequestDTO } from './RegisterService.types';
import { RegisterService } from './RegisterService';
import { APIError } from '../../models';

const registerKeys = {
  all: ['register'] as const,
  create: () => [...registerKeys.all, 'create'] as const,
};

const usePostRegisterMutation = () => {
  return useMutation<void, APIError, PostRegisterRequestDTO>({
    mutationKey: registerKeys.create(),
    mutationFn: (data: PostRegisterRequestDTO) => RegisterService.postRegister(data),
  });
};

export { usePostRegisterMutation };
