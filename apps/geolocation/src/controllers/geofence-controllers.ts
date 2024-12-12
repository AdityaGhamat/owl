import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  GeofenceSchema,
  GeofenceSchemaEdit,
  QuerySchema,
} from "@repo/validations/geofence";
import geofenceServices from "../services/geofence-services.js";
import { SuccessResponse } from "../lib/success/success-response.js";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../errors/error-response.js";
import { ZodError } from "zod";

const geofenceController = new Hono()
  .post("/create", zValidator("json", GeofenceSchema), async (c) => {
    const data = c.req.valid("json");
    try {
      const fence = await geofenceServices.createFence(data);
      return SuccessResponse(
        StatusCodes.CREATED,
        "Geofence has been deployed",
        fence
      );
    } catch (error: any) {
      return ErrorResponse(StatusCodes.BAD_REQUEST, error, error.message);
    }
  })
  .get("/fences", async (c) => {
    try {
      const args = c.req.query();
      const fences = await geofenceServices.findFence(args);
      if (!fences) {
        return ErrorResponse(StatusCodes.NOT_FOUND, {}, "Fences not found");
      }
      return SuccessResponse(StatusCodes.OK, "Fences has been found", fences);
    } catch (error: any) {
      return ErrorResponse(StatusCodes.BAD_REQUEST, error, error.message);
    }
  })
  .get("/fence/:id", async (c) => {
    try {
      const id = c.req.param("id");
      const fence = await geofenceServices.findFenceById(id);
      if (!fence) {
        return ErrorResponse(StatusCodes.NOT_FOUND, {}, "Fences not found");
      }
      return SuccessResponse(StatusCodes.OK, "Fences has been found", fence!);
    } catch (error: any) {
      return ErrorResponse(StatusCodes.BAD_REQUEST, error, error.message);
    }
  })
  .put("/fence/:id", zValidator("json", GeofenceSchemaEdit), async (c) => {
    const data = c.req.valid("json");
    const id = c.req.param("id");
    try {
      const fence = await geofenceServices.findByIdAndUpdateFence(id, data, {
        new: true,
      });
      if (!fence) {
        return ErrorResponse(
          StatusCodes.BAD_REQUEST,
          {},
          "Fence not found or could not be updated"
        );
      }
      return SuccessResponse(StatusCodes.OK, "Fence has been edited", { id });
    } catch (error: any) {
      return ErrorResponse(StatusCodes.BAD_REQUEST, error, error.message);
    }
  })
  .delete("/fence/:id", async (c) => {
    const id = c.req.param("id");
    try {
      const fence = await geofenceServices.deleteFence(id);
      if (!fence) {
        return ErrorResponse(
          StatusCodes.BAD_REQUEST,
          {},
          "Fence can't be deleted"
        );
      }
      return SuccessResponse(StatusCodes.OK, "Fence has been removed", { id });
    } catch (error: any) {
      return ErrorResponse(StatusCodes.BAD_REQUEST, error, error.message);
    }
  })
  .get("/users/:officeId", async (c) => {
    try {
      const { officeId } = c.req.param();
      const radius = Number(c.req.query("radius"));
      const members = await geofenceServices.getMembersWithinRadius(
        officeId as string,
        radius
      );
      if (!members || members.length === 0) {
        return ErrorResponse(StatusCodes.NOT_FOUND, {}, "Members not found");
      }
      return SuccessResponse(StatusCodes.OK, "Members are found", members);
    } catch (error: any) {
      return ErrorResponse(StatusCodes.BAD_REQUEST, error, error.message);
    }
  })
  .get(
    "/distance",
    async (c) => {},
    async (c) => {
      try {
        const officeId = c.req.query("officeId");
        const distance = await geofenceServices.distanceBetUserAndOffice(
          officeId as string
        );
        if (!distance) {
          return ErrorResponse(
            StatusCodes.BAD_REQUEST,
            {},
            "Failed to find distance"
          );
        }
      } catch (error: any) {
        return ErrorResponse(StatusCodes.BAD_REQUEST, error, error.message);
      }
    }
  );

export default geofenceController;
