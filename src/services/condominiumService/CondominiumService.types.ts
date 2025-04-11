export enum Types {
  Residencial = "Residencial",
  Comercial = "Comercial",
  Misto = "Misto",
}

type CondominiumRequestDTO = {
  id?: number;
  nome: string;
  endereco: string;
  numero: number;
  cep: string;
  bairro: string;
  pais: string;
  estado: string;
  cnpj?: string;
  tipo: Types | string;
};

type GetCondominiumRequestDTO = {
  pageNumber: number;
  pageSize: number;
};

type PatchCondominiumStatusRequestDTO = {
  id: number;
  ativo: boolean;
};

export type { CondominiumRequestDTO, GetCondominiumRequestDTO, PatchCondominiumStatusRequestDTO };
