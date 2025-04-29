type GetUsersRequestDTO = {
  role?: string;
};

type BlockUserRequestDTO = {
  userBlock: string;
  isPermanent: boolean;
  lockoutDurationMinutes: number;
};

export type { GetUsersRequestDTO, BlockUserRequestDTO };
