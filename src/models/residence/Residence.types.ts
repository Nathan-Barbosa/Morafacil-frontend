type ResidenceResponseDTO = {
  id: number;
  endereco: string;
  numero: number;
  situacao: number;
  bloco: string;
  unidade: string;
  condominioId: number;
  condominio: {
    id: number;
    nome: string;
    endereco: string;
    numero: number;
    cep: string;
    bairro: string;
    pais: string;
    estado: string;
    cnpj: string | null;
    tipo: number;
    ativo: boolean;
  };
  usuariosIds: number[];
};

export type { ResidenceResponseDTO };
