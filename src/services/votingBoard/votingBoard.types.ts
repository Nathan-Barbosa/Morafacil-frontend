type Options = string[];

type VotingRequestDTO = {
  id?: number;
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  criadoPorId: number;
  mensagem: Options;
};

type GetVotingsRequestDTO = {
  pageNumber?: number;
  pageSize?: number;
};

export type { VotingRequestDTO, GetVotingsRequestDTO };
