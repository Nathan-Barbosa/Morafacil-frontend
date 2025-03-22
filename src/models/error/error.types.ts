type ErrorResponseDTO = {
  data: null;
  errors: string[];
};

export type APIErrorProps = {
  message: string;
  statusCode: number;
};

export type { ErrorResponseDTO };
