import { RoleResponseDTO } from '../role';

type UserResponseDTO = {
  id: number;
  name: string;
  email?: string;
  role?: RoleResponseDTO[];
  residence: number;
};

export type { UserResponseDTO };
