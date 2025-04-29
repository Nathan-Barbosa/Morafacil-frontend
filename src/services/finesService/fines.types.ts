type FineRequestDTO = {
  id?: number;
  valor: number;
  data: Date;
  motivo: string;
  status: string;
  residenciaId: number;
};

type UpdateFineRequestDTO = {
  id: number;
  valor: number;
  data: Date;
  motivo: string;
  status: number;
};

type GetFinesRequestDTO = {
  pageNumber?: number;
  pageSize?: number;
};

export type { FineRequestDTO, GetFinesRequestDTO, UpdateFineRequestDTO };
