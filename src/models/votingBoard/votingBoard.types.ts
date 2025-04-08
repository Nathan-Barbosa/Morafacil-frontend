type Options = {
  id: number;
  descricao: string;
  votacaoId: number;
  votacao: null;
  votosUsuarios: number[];
};

type VotingResponseDTO = {
  id?: number;
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  encerrada: boolean;
  criadoPorId: number;
  criadoPor?: number;
  opcoes: Options;
};

type GetVotingResponseDTO = {
  id?: number;
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  encerrada: boolean;
};

export type { VotingResponseDTO, GetVotingResponseDTO };
