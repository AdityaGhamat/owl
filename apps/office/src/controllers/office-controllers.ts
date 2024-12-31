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
  })
  .put("/join-office", async (c) => {
    const { user_id, office_id } = c.req.query();
    const response = await officeServices.joinOffice(
      office_id as string,
      user_id as string
    );
    const { employees } = response;
    return SuccessResponse(StatusCodes.ACCEPTED, "Joined office successfully", {
      employees,
    });
  })
  .get("/employees/:office_id", async (c) => {
    const { office_id } = c.req.param();
    const response = await officeServices.getEmployees(office_id);
    if (!response) {
      return ErrorResponse(StatusCodes.NOT_FOUND, {}, "Employee not found");
    }
    return SuccessResponse(
      StatusCodes.OK,
      "Employee found successfully",
      response
    );
  })
  .get("/office-time/:office_id", async (c) => {
    const { office_id } = c.req.param();
    const response =
      await officeServices.getStartAndEndTimeByOfficeId(office_id);
    if (!response) {
      return ErrorResponse(
        StatusCodes.BAD_REQUEST,
        {},
        "Failed to find start and end time."
      );
    }
    return SuccessResponse(
      StatusCodes.OK,
      "Succeessfully got start and end time",
      response
    );
  })
  .get("/office-location/:office_id", async (c) => {
    const { office_id } = c.req.param();
    const response = await officeServices.getLocation(office_id);
    if (!response) {
      return ErrorResponse(
        StatusCodes.BAD_REQUEST,
        {},
        "Failed to find location"
      );
    }
    return SuccessResponse(
      StatusCodes.OK,
      "Successfully got location",
      response
    );
  })
  .get("/employee-check/:office_id", async (c) => {
    const { employeeId } = c.req.query();
    const { office_id } = c.req.param();
    const response = await officeServices.employeeCheck(
      office_id,
      employeeId as string
    );
    if (!response) {
      return ErrorResponse(
        StatusCodes.BAD_REQUEST,
        {},
        "Failed to find employee"
      );
    }
    return SuccessResponse(
      StatusCodes.OK,
      "Successfully got employee",
      response
    );
  });

export default officeControllers;
