type GetUsersRequestDTO = {
  role?: string;
};

type BlockUserRequestDTO = {
  userBlock: string;
  isPermanent: boolean;
  lockoutDurationMinutes: number;
};

type AssociateCondominiumDTO = {
  userId: string;
  condominioId: number;
};

export type { GetUsersRequestDTO, BlockUserRequestDTO, AssociateCondominiumDTO };
