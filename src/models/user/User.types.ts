import { RoleResponseDTO } from "../role";

type UserResponseDTO = {
  id: number;
  name: string;
  email?: string;
  cpf: string;
  roles: RoleResponseDTO[];
  residence: number;
  condominioid: string;
};

export type { UserResponseDTO };
