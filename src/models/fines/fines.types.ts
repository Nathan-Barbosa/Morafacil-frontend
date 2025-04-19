import { ResidenceResponseDTO } from "../residence";

type FinesResponseDTO = {
  id: number | undefined;
  valor: number;
  data: string;
  motivo: string;
  status: number;
  residenciaId: number;
  residencia: ResidenceResponseDTO | null;
};

type GetFinesResponseDTO = {
  id?: number;
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  encerrada: boolean;
};

export type { FinesResponseDTO, GetFinesResponseDTO };
