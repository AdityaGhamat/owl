import officeServices from "../services/office-services.js";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  createOfficeSchema,
  updateOfficeSchema,
} from "@repo/validations/office";
import { ErrorResponse } from "../lib/error-response.js";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../lib/success-response.js";

const officeControllers = new Hono()
  .post("/create", zValidator("json", createOfficeSchema), async (c) => {
    const data = c.req.valid("json");
    const office = await officeServices.createOffice(data);
    if (!office) {
      return ErrorResponse(
        StatusCodes.BAD_REQUEST,
        null,
        "Failed to add office"
      );
    }
    return SuccessResponse(StatusCodes.CREATED, "Office added successfully", {
      id: office.name,
      orgId: office.organizationId,
    });
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const office = await officeServices.findOfficeById(id);
    if (!office) {
      return ErrorResponse(StatusCodes.NOT_FOUND, {}, "Office not found");
    }
    return SuccessResponse(
      StatusCodes.OK,
      "Office found successfully",
      office!
    );
  })
  .get("/offices-on-field", async (c) => {
    const { name, organizationId, lat, lng }: Record<string, any> =
      c.req.query();
    const args: Record<string, any> = {};
    if (name) args.name = name;
    if (organizationId) args.organizationId = organizationId;
    if (lat && lng) args.location = { coordinates: [lng, lat] };
    const offices = await officeServices.findOfficeBasedOnField(args);
    if (!offices) {
      return ErrorResponse(StatusCodes.NOT_FOUND, {}, "Offices not found");
    }
    return SuccessResponse(StatusCodes.OK, "Offcies are found", offices!);
  })
  .get("/offices", async (c) => {
    const args = c.req.query();
    const offices = await officeServices.findOffices(args);
    if (!offices) {
      return ErrorResponse(StatusCodes.NOT_FOUND, {}, "Offices not found");
    }
    return SuccessResponse(StatusCodes.OK, "Offices are found", offices!);
  })
  .put("/office", zValidator("json", updateOfficeSchema), async (c) => {
    const data = c.req.valid("json");
    const id = c.req.query("id");
    if (!data) {
      return ErrorResponse(
        StatusCodes.BAD_REQUEST,
        {},
        "Failed to edit office"
      );
    }
    const updatedOffice = await officeServices.findByIdAndUpdateOffice(
      id!,
      data
    );
    return SuccessResponse(StatusCodes.OK, "Office updated successfully", {
      name: updatedOffice?.name,
    });
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    console.log(id);
    const response = await officeServices.findByIdAndDeleteOffice(id);
    if (!response) {
      return ErrorResponse(
        StatusCodes.BAD_REQUEST,
        {},
        "Failed to edit office"
      );
    }
    return SuccessResponse(StatusCodes.OK, "Office updated successfully", {});
  })
  .get("/", async (c) => {
    const { id } = c.req.query();

    const response = await officeServices.co_ordinatesById(id!);
    console.log(response, "in controller");
    if (!response) {
      return ErrorResponse(
        StatusCodes.BAD_REQUEST,
        {},
        "Failed to find office"
      );
    }
    return SuccessResponse(
      StatusCodes.OK,
      "Office found successfully",
      response
    );
  });

export default officeControllers;
