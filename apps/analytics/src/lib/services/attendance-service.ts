import axios from "axios";
import { Attendance } from "../../types/database.js";
import serverConfig from "../../config/server-config.js";
class AttendanceService {
  private officeId: string;
  constructor(officeId: string) {
    this.officeId = officeId;
  }
  private async getAttendance() {
    const response = await axios.get<{ data: Attendance }>(
      `${serverConfig.ATTENDANCE_SERVICE}/api/v1/attendance/employees-by-officeId/${this.officeId}`
    );
    const Attendance = response?.data?.data;
    return Attendance;
  }
}

export default AttendanceService;
