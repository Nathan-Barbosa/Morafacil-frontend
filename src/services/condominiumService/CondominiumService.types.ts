export enum Types {
  CASA = "houses",
  APARTAMENTO = "houses",
}

type PostCreateCondominiumRequestDTO = {
  nome: string;
  endereco: string;
  numero: string;
  cep: string;
  bairro: string;
  pais: string;
  estado: string;
  cnpj?: string;
  tipo: Types;
  areasComuns?: boolean;
  situacao: number;
  bloco: string;
  unidade: string;
  condominioId: number;
};

export type { PostCreateCondominiumRequestDTO };
