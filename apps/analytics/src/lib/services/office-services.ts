import axios from "axios";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";
import serverConfig from "../../config/server-config.js";
import { IOffice } from "@repo/types/src/database.js";
class OfficeService {
  private officeId: string;
  constructor(officeId: string) {
    this.officeId = officeId;
  }
  private handleResponse<T>(response: T, errorMessage: string): T {
    if (!response) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: errorMessage,
      });
    }
    return response;
  }
  private async getOffice() {
    const office = await axios.get<{ data: IOffice }>(
      `${serverConfig.OFFICE_SERVICE}/api/v1/office/${this.officeId}`
    );
    return this.handleResponse(office.data?.data, "Failed to find office");
  }
  public async getEmployeeNumbers() {
    const office = await this.getOffice();
    const employees = office.employees;
    return this.handleResponse(employees, "Failed to gather employees");
  }
}

export default OfficeService;
