type Options = {
  id: number;
  descricao: string;
  votacaoId: number;
  votacao: null;
  votosUsuarios: number[];
};

type OptionsResponseDTO = {
  id: number;
  descricao: string;
  quantidadeVotos: number;
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

type GetVotingByIdResponseDTO = {
  id?: number;
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  encerrada: boolean;
  opcoes: OptionsResponseDTO[];
};

type GetVotingResponseDTO = {
  id?: number;
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  encerrada: boolean;
};

export type { VotingResponseDTO, GetVotingResponseDTO, GetVotingByIdResponseDTO };
