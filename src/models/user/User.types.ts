import { RoleResponseDTO } from '../role';

type UserResponseDTO = {
  id: number;
  name: string;
  email?: string;
  roles: RoleResponseDTO[];
  residence: number;
};

export type { UserResponseDTO };
