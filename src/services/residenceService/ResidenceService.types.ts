type GetResidencesRequestDTO = {
  pageNumber?: number;
  pageSize?: number;
};

type PatchAssociateUserRequestDTO = {
  residenciaId: number;
  usuarioId: number;
};

type PostCreateResidenceRequestDTO = {
  endereco: string;
  numero: number;
  situacao: string;
  bloco: string;
  unidade: string;
  condominioId: number;
};

export type {
  GetResidencesRequestDTO,
  PatchAssociateUserRequestDTO,
  PostCreateResidenceRequestDTO,
};
