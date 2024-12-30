import { location } from "@repo/types/src/database.js";
import serverConfig from "../config/server-config.js";
import axios from "axios";
class UserServices {
  public async co_ordinatesOfOffice(employeeId: string) {
    const response = await axios.get<{ data: [number, number] }>(
      `${serverConfig.AUTH_SERVICE}/api/v1/user/location?id=${employeeId}`
    );

    const location = response.data?.data;
    return location;
  }
}

export default new UserServices();
