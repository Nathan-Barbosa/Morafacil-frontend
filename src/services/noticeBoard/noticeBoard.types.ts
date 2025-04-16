type CreateNoticesRequestDTO = {
  id?: number;
  titulo: string;
  mensagem: string;
  condominioId: number;
};

type UpdateNoticeRequestDTO = {
  id: number;
  titulo: string;
  mensagem: string;
  condominioId: number;
};

export type { CreateNoticesRequestDTO, UpdateNoticeRequestDTO };
