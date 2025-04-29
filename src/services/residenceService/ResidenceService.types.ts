type GetResidencesRequestDTO = {
  pageNumber?: number;
  pageSize?: number;
};

type PatchAssociateUserRequestDTO = {
  residenciaId: number;
  usuarioId: number;
};

type PatchRemoveUserRequestDTO = PatchAssociateUserRequestDTO;

type PostCreateResidenceRequestDTO = {
  endereco: string;
  numero: number;
  situacao: string;
  bloco: string;
  unidade: string;
  condominioId: number;
};

type PutUpdateResidenceRequestDTO = {
  id: number;
  endereco: string;
  numero: number;
  situacao: string;
  bloco: string;
  unidade: string;
};

export type {
  GetResidencesRequestDTO,
  PatchAssociateUserRequestDTO,
  PostCreateResidenceRequestDTO,
  PatchRemoveUserRequestDTO,
  PutUpdateResidenceRequestDTO,
};
