import { ErrorResponse } from "../response/error-response.js";
import { StatusCodes } from "http-status-codes";
export function DateParser(date: string | undefined) {
  if (!date) {
    return ErrorResponse(StatusCodes.BAD_REQUEST, {}, "Date is required");
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return ErrorResponse(StatusCodes.BAD_REQUEST, {}, "Invalid date format");
  }
  return parsedDate;
}
