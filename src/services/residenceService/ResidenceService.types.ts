type GetResidencesRequestDTO = {
  pageNumber?: number;
  pageSize?: number;
};

type PatchAssociateUserRequestDTO = {
  residenciaId: number;
  usuarioId: number;
};

export type { GetResidencesRequestDTO, PatchAssociateUserRequestDTO };
