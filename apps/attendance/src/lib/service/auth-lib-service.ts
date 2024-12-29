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
    return location.coordinates;
  }
  private async getOfficeLocation() {
    const request = new AttendanceOfficeServices(this.office_id);
    const response = await request.location();
    return response.coordinates;
  }
  async calculateDistance() {
    const [userLocation, officeLocation] = await Promise.all([
      this.getUserLocation(),
      this.getOfficeLocation(),
    ]);
    const response = await axios.get<{ data: number }>(
      `${serverConfig.GEOFENCE_SERVICE}/api/v1/geofence?user_lat=${userLocation[0]}&user_lng=${userLocation[1]}&office_lat=${officeLocation[0]}&office_lng=${officeLocation[1]}`
    );
    const distance = response.data?.data;
    return distance;
  }
}
export default AuthService;
