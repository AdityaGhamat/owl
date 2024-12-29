import axios from "axios";
import serverConfig from "../../config/server-config.js";
import { location } from "@repo/types/src/database.js";
class AuthService {
  async getUserLocation(employeeId: string) {
    const response = await axios.get<{ data: location }>(
      `${serverConfig.AUTH_SERVICE}/api/v1/user/location?id=${employeeId}`
    );
    const location = response.data?.data;
    return location.coordinates;
  }
}
