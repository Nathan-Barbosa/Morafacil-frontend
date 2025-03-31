export enum Types {
  Residencial = "Residencial",
  Comercial = "Comercial",
  Misto = "Misto",
}

type PostCreateCondominiumRequestDTO = {
  nome: string;
  endereco: string;
  numero: number;
  cep: string;
  bairro: string;
  pais: string;
  estado: string;
  cnpj?: string;
  tipo: Types;
};

type GetCondominiumRequestDTO = {
  pageNumber: number;
  pageSize: number;
};

export type { PostCreateCondominiumRequestDTO, GetCondominiumRequestDTO };
