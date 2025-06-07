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
    const defaultError = APIError.defaultErrorObj;

    const statusCode = error.response?.status || defaultError.statusCode;
    const message = error.response?.data?.message || defaultError.message;

    return new APIError({ message, statusCode });
  }
}

export { APIError };
