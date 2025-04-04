type CreateNoticesRequestDTO = {
  id?: number;
  titulo: string;
  mensagem: string;
};

type UpdateNoticeRequestDTO = {
  id: number;
  titulo: string;
  mensagem: string;
};

export type { CreateNoticesRequestDTO, UpdateNoticeRequestDTO };
