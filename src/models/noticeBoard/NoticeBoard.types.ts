type User = {
  id: number;
  userName: string;
};

type NoticeResponseDTO = {
  id: 1;
  titulo: string;
  mensagem: string;
  dataPublicacao: Date;
  usuario: User;
};

export type { NoticeResponseDTO };
