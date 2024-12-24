import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HistoricalAttendanceSchema } from "@repo/validations/attendance";
import attendanceHistoryService from "../services/attendance-history-service.js";
import { ErrorResponse } from "../lib/error-response.js";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../lib/success-response.js";
import { AttendanceQueryArgs } from "../types/services.js";

const app = new Hono()
  .post(
    "/create",
    zValidator("json", HistoricalAttendanceSchema),
    async (c) => {
      const data = c.req.valid("json");
      const response = await attendanceHistoryService.create(data);
      if (!response) {
        return ErrorResponse(
          StatusCodes.BAD_REQUEST,
          {},
          "Failed to create attendance record"
        );
      }
      return SuccessResponse(
        StatusCodes.CREATED,
        "Attendance Record has been created",
        {}
      );
    }
  )
  .get("/", async (c) => {
    const queryParams = c.req.query();
    const args: AttendanceQueryArgs = {};
    if (queryParams.employeeId) args.employeeId = queryParams.employeeId;
    if (queryParams.startDate || queryParams.endDate) {
      args.date = {};
      if (queryParams.startDate)
        args.date.$gte = new Date(queryParams.startDate);
      if (queryParams.endDate) args.date.$lte = new Date(queryParams.endDate);
    }
    const response = await attendanceHistoryService.find(args);
    return SuccessResponse(
      StatusCodes.OK,
      "Records retrieved successfully",
      response
    );
  })
  .get("/single-user", async (c) => {
    const queryParams = c.req.query();
    const args: AttendanceQueryArgs = {};
    if (queryParams.employeeId) args.employeeId = queryParams.employeeId;
    if (queryParams.startDate || queryParams.endDate) {
      args.date = {};
      if (queryParams.startDate)
        args.date.$gte = new Date(queryParams.startDate);
      if (queryParams.endDate) args.date.$lte = new Date(queryParams.endDate);
    }
    const response = await attendanceHistoryService.findOne(args);
    if (!response) {
      return ErrorResponse(
        StatusCodes.NOT_FOUND,
        {},
        "Attendance Record not found"
      );
    }
    return SuccessResponse(
      StatusCodes.OK,
      "Records retrieved successfully",
      response
    );
  })
  .get("/:attendanceHistoryId", async (c) => {
    const { attendanceHistoryId } = c.req.param();
    const response =
      await attendanceHistoryService.findById(attendanceHistoryId);
    if (!response) {
      return ErrorResponse(
        StatusCodes.NOT_FOUND,
        {},
        "Attendance Record not found"
      );
    }
    return SuccessResponse(
      StatusCodes.OK,
      "Records retrieved successfully",
      response
    );
  });

export default app;
