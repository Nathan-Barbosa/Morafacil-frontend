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
    tipo: number;
    ativo: boolean;
  };
  usuariosIds: number[];
}[];

export type { ResidenceResponseDTO };
