type Options = string[];

type VotingRequestDTO = {
  id?: number;
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  criadoPorId: number;
  opcoes: Options;
};

type GetVotingsRequestDTO = {
  pageNumber?: number;
  pageSize?: number;
};

type PostVoteRequestDTO = {
  usuarioId?: number;
  opcaoVotacaoId?: number;
};

export type { VotingRequestDTO, GetVotingsRequestDTO, PostVoteRequestDTO };
