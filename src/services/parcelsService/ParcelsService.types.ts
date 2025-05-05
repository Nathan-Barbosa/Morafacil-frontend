type PostParcelRequestDTO = {
  numeroEncomenda: string;
  residenciaId: number;
};

type PatchPickupParcelRequestDTO = {
  encomendaId: number;
  retiradoPor: string;
};

export type { PostParcelRequestDTO, PatchPickupParcelRequestDTO };
