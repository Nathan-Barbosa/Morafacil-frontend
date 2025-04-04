type User = {
  id: number;
  userName: string;
};

type NoticeResponseDTO = {
  id: number;
  titulo: string;
  mensagem: string;
  dataPublicacao: Date;
  usuario: User | null;
};

export type { NoticeResponseDTO };
