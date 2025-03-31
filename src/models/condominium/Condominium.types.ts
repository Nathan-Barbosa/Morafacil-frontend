type PostCondominiumResponseDTO = {
  id: number;
  nome: string;
  endereco: string;
  tipo: number;
  ativo: boolean;
};

type GetCondominiumResponseDTO = {
  id: string;
  nome: string;
  endereco: string;
  numero: number;
  cep: string;
  bairro: string;
  pais: string;
  estado: string;
  cnpj?: string;
  tipo: number;
  ativo: boolean;
};

export type { PostCondominiumResponseDTO, GetCondominiumResponseDTO };
