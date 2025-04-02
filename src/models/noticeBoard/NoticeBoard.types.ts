type User = {
  id: number;
  userName: string;
};

type NoticeResponseDTO = {
  id: number;
  titulo: string;
  mensagem: string;
  dataPublicacao: Date;
  usuario: User;
};

type CreateNoticeResponseDTO = {
  id: number;
  titulo: string;
  mensagem: string;
  dataPublicacao: Date;
  usuarioId: number;
  usuario: User | null;
};

export type { NoticeResponseDTO, CreateNoticeResponseDTO };
