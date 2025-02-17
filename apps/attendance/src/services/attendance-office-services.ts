import axios from "axios";
import serverConfig from "../config/server-config.js";
import { IOffice } from "@repo/types/src/database.js";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";
import { members } from "../types/services.js";
class AttendanceOfficeServices {
  private office_id: string;
  private office!: IOffice;
  constructor(office_id: string) {
    this.office_id = office_id;
  }
  async getOfficeDetails() {
    const response = await axios.get<{ data: IOffice }>(
      `${serverConfig.OFFICE_SERVICE}/api/v1/office/${this.office_id}`
    );
    const data = response.data?.data;
    this.office = data;
    console.log(this.office);
    return data;
  }
  private async getEmployeeId() {
    const employees = this.office?.employees;
    if (!employees) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "employees are not found",
      });
    }
    return employees;
  }
  async isOfficeUserPresent(members: members) {
    const employeeIds = await this.getEmployeeId();
    const employeeSet = new Set(employeeIds);
    const presentMembers: members = [];
    for (const member of members) {
      if (employeeSet.has(member.id)) {
        presentMembers.push(member);
      }
    }
    if (!presentMembers) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Employees are not present",
      });
    }
    return presentMembers;
  }
  async time() {
    const startTime = this.office.startTime;
    const endTime = this.office.endTime;
    const data = { startTime, endTime };
    return data;
  }
  async location() {
    const location = this.office.location;
    return location;
  }
}

export default AttendanceOfficeServices;
