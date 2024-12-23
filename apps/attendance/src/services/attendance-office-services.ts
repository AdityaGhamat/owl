import axios from "axios";
import serverConfig from "../config/server-config.js";
import { IOffice } from "@repo/types/src/database.js";
class AttendanceOfficeServices {
  async getOfficeDetails(office_id: string) {
    const response = await axios.get<{ data: IOffice }>(
      `${serverConfig.OFFICE_SERVICE}/api/v1/office/${office_id}`
    );
    const data = response.data?.data;
    return data;
  }
}

export default new AttendanceOfficeServices();
