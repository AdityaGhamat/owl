import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { GeofenceSchema, GeofenceSchemaEdit } from "@repo/validations/geofence";
import geofenceServices from "../services/geofence-services.js";
import { SuccessResponse } from "../lib/success/success-response.js";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../errors/error-response.js";

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
  .get("/distance", async (c) => {
    const { user_lat, user_lng, office_lat, office_lng } = c.req.query();
    try {
      const office: [number, number] = [Number(office_lat), Number(office_lng)];
      const user: [number, number] = [Number(user_lat), Number(user_lng)];
      const distance = await geofenceServices.distanceBetUserAndOffice(
        office,
        user
      );
      if (!distance) {
        return ErrorResponse(
          StatusCodes.BAD_REQUEST,
          {},
          "Failed to find the distance"
        );
      }
      return SuccessResponse(
        StatusCodes.OK,
        "Successfully found the distance",
        distance
      );
    } catch (error: any) {
      return ErrorResponse(StatusCodes.BAD_REQUEST, error, error.message);
    }
  })
  .get("/distance-user-office", async (c) => {
    try {
      const { office_id, employee_id } = c.req.query();
      const response = await geofenceServices.distance(
        office_id as string,
        employee_id as string
      );
      return SuccessResponse(StatusCodes.OK, "distance is found", response);
    } catch (error: any) {
      return ErrorResponse(StatusCodes.BAD_REQUEST, error, error.message);
    }
  });

export default geofenceController;
