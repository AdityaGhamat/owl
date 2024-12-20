import officeRepository from "../repository/officeRepository.js";
import { IOffice } from "../types/database/index.js";
import axios from "axios";
import serverConfig from "../config/server-config.js";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";

class OfficeServices {
  async createOffice(data: Partial<IOffice>) {
    let office;
    try {
      office = await officeRepository.create(data);
      const { organizationId, _id } = office;
      const org = await axios.put(
        `${serverConfig.ORG_SERVICE}/api/v1/organization/office?organizationId=${organizationId}&offId=${_id}`
      );
      if (org.status != StatusCodes.OK) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
          message: "Failed to put office in organization",
        });
      }
      return office;
    } catch (error) {
      if (office && office._id) {
        await this.findByIdAndDeleteOffice(office._id);
      }
    }
  }
  async findOfficeById(id: string) {
    const office = await officeRepository.findById(id);
    return office;
  }
  async findOffices(args: any) {
    const offices = await officeRepository.find(args);
    return offices;
  }
  async findOfficeBasedOnField(args: any) {
    const office = await officeRepository.findOne(args);
    console.log(office);
    return office;
  }
  async findByIdAndUpdateOffice(id: string, data: Partial<IOffice>) {
    const office = await officeRepository.findByIdAndUpdate(id, data, {
      new: true,
    });
    return office;
  }
  async findByIdAndDeleteOffice(id: any) {
    const office = await officeRepository.findByIdAndDelete(id);
    if (!office) {
      return false;
    }
    return true;
  }
  async co_ordinatesById(id: string) {
    console.log(id, "before findbyId in services");
    const location = await officeRepository.findById(id, ["location"]);
    console.log(location, "after findbyId in services");
    if (!location) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "location not found",
      });
    }
    return location;
  }
}

export default new OfficeServices();
