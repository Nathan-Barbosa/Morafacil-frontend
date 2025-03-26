type ResponseDTO<T> = {
  data: T;
  message: string;
  code: number;
};

type PaginatedResponse<T> = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  data: T;
  message: string;
  code: number;
};

export type { ResponseDTO, PaginatedResponse };
