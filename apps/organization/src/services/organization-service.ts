import { HTTPException } from "hono/http-exception";
import organizationRepository from "../repository/organization-repository.js";
import { organizationCreation } from "../types/service/index.js";
import { StatusCodes } from "http-status-codes";
class OrganizationServices {
  async createOrganization(data: organizationCreation) {
    const organization = await organizationRepository.create(data);
    if (!organization) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Error while creating organization",
      });
    }
    return organization;
  }
  async editOrganizatoin(id: string, data: Partial<organizationCreation>) {
    const organization = await organizationRepository.findByIdAndUpdate(
      id,
      data
    );
    if (!organization) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Error while editing organization",
      });
    }
    return organization;
  }
  async getOrganization(id: string) {
    const organization = await organizationRepository.findById(id);
    if (!organization) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Organization not found",
      });
    }
    return organization;
  }
  async deleteOrganization(id: string) {
    const organization = await organizationRepository.findByIdAndDelete(id);
    if (!organization) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Error while deleting organization",
      });
    }
    return true;
  }
  async addOffice(organizationId: string, officeId: any) {
    console.log("organization id", organizationId);
    console.log("officeId", officeId);
    const organization = await organizationRepository.findByIdAndUpdate(
      organizationId,
      {
        $push: { offices: officeId },
      },
      { new: true }
    );
    console.log(organization);
    return organization;
  }
}

export default new OrganizationServices();
