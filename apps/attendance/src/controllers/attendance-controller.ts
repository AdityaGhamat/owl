import { SuccessResponse } from "../lib/success-response.js";
import { ErrorResponse } from "../lib/error-response.js";
import attendanceService from "../services/attendance-service.js";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  AttendanceSchema,
  members,
  updateAttendanceSchema,
} from "@repo/validations/attendance";
import { StatusCodes } from "http-status-codes";

const app = new Hono()
  .post("/", zValidator("json", AttendanceSchema), async (c) => {
    const attendanceData = c.req.valid("json");
    const response = await attendanceService.createAttendance(attendanceData);
    if (!response) {
      return ErrorResponse(
        StatusCodes.BAD_REQUEST,
        {},
        "Failed to add attendance"
      );
    }
    return SuccessResponse(
      StatusCodes.CREATED,
      "Attendance added successfully",
      { id: response.id, employeeId: response.employeeId }
    );
  })
  .put(
    "/:attendanceId",
    zValidator("json", updateAttendanceSchema),
    async (c) => {
      const attendanceData = c.req.valid("json");
      const { attendanceId } = c.req.param();
      if (!attendanceId) {
        return ErrorResponse(
          StatusCodes.BAD_REQUEST,
          {},
          "Please provide with attendance id"
        );
      }
      const response = await attendanceService.updateAttendance(
        attendanceId,
        attendanceData
      );
      if (!response) {
        return ErrorResponse(
          StatusCodes.BAD_REQUEST,
          {},
          "Failed to update attendance"
        );
      }
      return SuccessResponse(
        StatusCodes.OK,
        "Successfully updated Attendance",
        { id: response.id, employeeId: response.employeeId }
      );
    }
  )
  .get("/employee", async (c) => {
    const { employeeId } = c.req.query();
    if (!employeeId) {
      return ErrorResponse(
        StatusCodes.BAD_REQUEST,
        {},
        "Please provide with employee Id"
      );
    }
    const response =
      await attendanceService.getAttendanceOfEmployee(employeeId);
    if (!response) {
      return ErrorResponse(StatusCodes.NOT_FOUND, {}, "Employee not found");
    }
    return SuccessResponse(
      StatusCodes.OK,
      "Employee found successfully",
      response
    );
  })
  .get("/employee-by-date", async (c) => {
    const { date } = c.req.query();
    if (!date) {
      return ErrorResponse(StatusCodes.BAD_REQUEST, {}, "Please provide date ");
    }
    const attendanceRecords = await attendanceService.getAttendanceByDate(
      new Date(date as string)
    );
    if (!attendanceRecords) {
      return ErrorResponse(
        StatusCodes.NOT_FOUND,
        {},
        "Attendance records not found"
      );
    }
    return SuccessResponse(
      StatusCodes.OK,
      "Attendance record found successfully",
      attendanceRecords
    );
  })
  .get("/employee-by-id-and-date/:employeeId", async (c) => {
    const { employeeId } = c.req.param();
    const { date } = c.req.query();
    if (!(employeeId && date)) {
      return ErrorResponse(
        StatusCodes.BAD_REQUEST,
        {},
        "Please provide with employeeId and date"
      );
    }
    const attendanceRecord =
      await attendanceService.getAttendanceByEmployeeAndDate(
        employeeId,
        new Date(date as string)
      );
    if (!attendanceRecord) {
      return ErrorResponse(
        StatusCodes.NOT_FOUND,
        {},
        "Attendance record is not found"
      );
    }
    return SuccessResponse(
      StatusCodes.OK,
      "Record found successfully",
      attendanceRecord
    );
  })
  .post("/mark-attendance", zValidator("json", members), async (c) => {
    console.log(c.req.json);
    const membersList = c.req.valid("json");
    const officeId = c.req.query("officeId");
    console.log(membersList);
    const response = await attendanceService.markAttendance(
      membersList,
      officeId as string
    );
    if (!response) {
      return ErrorResponse(
        StatusCodes.BAD_REQUEST,
        {},
        "Failed to mark attendance"
      );
    }
    return SuccessResponse(
      StatusCodes.CREATED,
      "Successfully marked attendance",
      {}
    );
  });

export default app;
