import { AxiosError } from "axios";

import { APIErrorProps, ErrorResponseDTO } from "./error.types";

class APIError extends Error {
  public message: string;
  public statusCode: number;

  public static defaultErrorObj = {
    statusCode: 500,
    message: "Ocorreu um erro. Tente novamente mais tarde",
  };

  constructor({ message, statusCode }: APIErrorProps) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
  }

  public static fromAxiosError(error: AxiosError<ErrorResponseDTO>): APIError {
    return new APIError(
      error.response?.data
        ? {
            message: error.response.data.errors[0],
            statusCode: error.response.status,
          }
        : APIError.defaultErrorObj,
    );
  }
}

export { APIError };
