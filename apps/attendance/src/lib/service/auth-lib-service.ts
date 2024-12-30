import axios from "axios";
import serverConfig from "../../config/server-config.js";
import { location } from "@repo/types/src/database.js";
import AttendanceOfficeServices from "../../services/attendance-office-services.js";
class AuthService {
  private office_id: string;
  private employeeId: string;
  constructor(office_id: string, employeeId: string) {
    this.office_id = office_id;
    this.employeeId = employeeId;
  }
  private async getUserLocation() {
    const response = await axios.get<{ data: location }>(
      `${serverConfig.AUTH_SERVICE}/api/v1/user/location?id=${this.employeeId}`
    );
    const location = response.data?.data;
    console.log(location);
    return location.coordinates;
  }
  private async getOfficeLocation() {
    const request = new AttendanceOfficeServices(this.office_id);
    const response = await request.location();
    console.log(response);
    return response.coordinates;
  }
  async calculateDistance() {
    const response = await axios.get<{ data: number }>(
      `${serverConfig.GEOFENCE_SERVICE}/api/v1/geofence/distance-user-office?office_id=${this.office_id}&employee_id=${this.employeeId}`
    );
    const distance = response.data?.data;
    console.log(distance, "distance in auth service");
    return distance;
  }
}
export default AuthService;
