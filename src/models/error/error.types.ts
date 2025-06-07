export type ErrorResponseDTO = {
  data: any;
  message: string;
  code: number;
};

export type APIErrorProps = {
  message: string;
  statusCode: number;
};
