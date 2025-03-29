import { useQuery } from '@tanstack/react-query';

import { APIError, ResponseDTO, UserResponseDTO } from '../../models';
import { UsersService } from './UsersService';

const usersKeys = {
  all: ['users'] as const,
  lists: () => [...usersKeys.all, 'list'] as const,
  list: (role: string) => [...usersKeys.lists(), role] as const,
};

const useGetUsersListQuery = (role: string) => {
  return useQuery<ResponseDTO<UserResponseDTO[]>, APIError>({
    queryKey: usersKeys.list(role),
    queryFn: () => UsersService.getUsers(role),
  });
};

export { useGetUsersListQuery };
