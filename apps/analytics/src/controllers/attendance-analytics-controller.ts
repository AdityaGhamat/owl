import { zValidator } from "@hono/zod-validator";
import { AttendanceAnalyticsCreation } from "@repo/validations/analytics";
import { Hono } from "hono";
import attendanceAnalyticsService from "../services/attendance-analytics-service.js";
import { SuccessResponse } from "../lib/response/success-response.js";
import { StatusCodes } from "http-status-codes";
import { DateParser } from "../lib/other/date.js";

const app = new Hono()
  .post("/", zValidator("json", AttendanceAnalyticsCreation), async (c) => {
    const data = c.req.valid("json");
    const response = await attendanceAnalyticsService.create(data);
    return SuccessResponse(StatusCodes.CREATED, "Created successfully", {
      id: response.id,
    });
  })
  .get("/analytics-by-date", async (c) => {
    const { date, officeId } = c.req.query();
    const parsedDate = DateParser(date);
    const data = {
      attendanceDate: parsedDate as Date,
    };
    const response = await attendanceAnalyticsService.findAnalyticsByDate(
      officeId as string,
      data
    );
    return SuccessResponse(
      StatusCodes.OK,
      "Successfully found records",
      response
    );
  })
  .put("/average/:officeId/update", async (c) => {
    const { officeId } = c.req.param();
    const response =
      await attendanceAnalyticsService.updateAvgWithOfficeId(officeId);
    return SuccessResponse(StatusCodes.OK, "Successfully updated", {
      count: response.count,
    });
  })
  .put("/average-with-id/:id/update", async (c) => {
    const { id } = c.req.param();
    const response = await attendanceAnalyticsService.updateAvgWithId(id);
    return SuccessResponse(StatusCodes.OK, "Successfully updated", {
      count: response.count,
    });
  })
  .get("/average-with-id/:id", async (c) => {
    const { id } = c.req.param();
    const { date } = c.req.query();
    const parsedDate = DateParser(date);
    const response = await attendanceAnalyticsService.getAverageById(
      id,
      parsedDate as Date
    );
    return SuccessResponse(
      StatusCodes.OK,
      "Successfully get the response",
      response
    );
  });
