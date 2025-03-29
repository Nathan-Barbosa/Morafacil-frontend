import { AxiosError } from "axios";
import { APIError, ErrorResponseDTO } from "../models";

const apiErrorHandler = async <T>(axiosRequestFunction: () => Promise<T>) => {
  try {
    const result = await axiosRequestFunction();

    return result;
  } catch (error) {
    const err = error as AxiosError<ErrorResponseDTO>;
    return Promise.reject(APIError.fromAxiosError(err));
  }
};

export { apiErrorHandler };
