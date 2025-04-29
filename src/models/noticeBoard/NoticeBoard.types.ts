type User = {
  id: number;
  userName: string;
};

type Condominio = {
  id: number;
  nome: string;
  cnpj: string;
};

type NoticeResponseDTO = {
  id: number;
  titulo: string;
  mensagem: string;
  dataPublicacao: Date;
  usuario: User | null;
  condominio: Condominio;
};

export type { NoticeResponseDTO };
