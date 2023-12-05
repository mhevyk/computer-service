import { AxiosError } from "axios";
import { APIError } from "../types/common";

export function extractErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    const data = error.response?.data as APIError;

    if (data.errors) {
      return data.errors.length > 0 ? data.errors[0] : data.message;
    }
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "Невідома помилка";
  }
}
