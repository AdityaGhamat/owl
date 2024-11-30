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
  .get("/fence/members/polygon", async (c) => {
    try {
      const { lat, lng } = c.req.query();
      const latitude = Number(lat);
      const longitude = Number(lng);

      if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        return ErrorResponse(
          StatusCodes.BAD_REQUEST,
          {},
          "Both 'lat' and 'lng' query parameters must be valid numbers."
        );
      }
      const members = await geofenceServices.findMembersWithPolygon([
        latitude,
        longitude,
      ]);
      return SuccessResponse(
        StatusCodes.OK,
        "Members found successfully",
        members!
      );
    } catch (error: any) {
      return ErrorResponse(StatusCodes.BAD_REQUEST, error, error.message);
    }
  })
  .get("/fence/members/circle", async (c) => {
    try {
      const { lat, lng, distance } = QuerySchema.parse(c.req.query());
      const latitude = Number(lat);
      const longitude = Number(lng);
      const maxDistance = Number(distance);
      if (
        isNaN(latitude) ||
        isNaN(longitude) ||
        (maxDistance !== undefined && isNaN(maxDistance))
      ) {
        return ErrorResponse(
          StatusCodes.BAD_REQUEST,
          {},
          "'lat', 'lng', and 'distance' must be valid numbers."
        );
      }
      const members = await geofenceServices.findMembersWithCircle(
        [latitude, longitude],
        maxDistance
      );
      return SuccessResponse(
        StatusCodes.OK,
        "Members found successfully",
        members!
      );
    } catch (error: any) {
      if (error instanceof ZodError) {
        return ErrorResponse(
          StatusCodes.BAD_REQUEST,
          error.errors,
          "Invalid query parameters."
        );
      }
      return ErrorResponse(StatusCodes.BAD_REQUEST, error, error.message);
    }
  });
export default geofenceController;
