import { Hono } from "hono";
import organizationService from "../services/organization-service.js";
import { ErrorResponse } from "../lib/error-response.js";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../lib/success-response.js";
import { zValidator } from "@hono/zod-validator";
import {
  OrganizationSchema,
  editOrganizationSchema,
} from "@repo/validations/organizations";

const organizationController = new Hono()
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    if (!id) {
      return ErrorResponse(
        StatusCodes.BAD_REQUEST,
        {},
        "Must be providing orgs id"
      );
    }
    const orgs = await organizationService.getOrganization(id);
    if (!orgs) {
      return ErrorResponse(StatusCodes.NOT_FOUND, {}, "Organization not found");
    }
    return SuccessResponse(
      StatusCodes.OK,
      "Organization found successfully",
      orgs
    );
  })
  .post("/create", zValidator("json", OrganizationSchema), async (c) => {
    const data = c.req.valid("json");
    const id = c.req.query("id");
    const org = await organizationService.createOrganization({
      ...data,
      createdBy: id,
    });
    if (!org) {
      return ErrorResponse(
        StatusCodes.BAD_REQUEST,
        {},
        "Failed to create organization"
      );
    }
    return SuccessResponse(
      StatusCodes.CREATED,
      "Organization created successfully",
      { id: org.id, name: org.name }
    );
  })
  .put("/edit", zValidator("json", editOrganizationSchema), async (c) => {
    const data = c.req.valid("json");
    const { id } = c.req.query();
    const org = await organizationService.editOrganizatoin(id!, data);
    if (!org) {
      return ErrorResponse(
        StatusCodes.BAD_REQUEST,
        {},
        "Failed to edit organization"
      );
    }
    return SuccessResponse(StatusCodes.OK, "Successfully edited organization", {
      id: org._id,
      name: org.name,
    });
  });

export default organizationController;
