import axios from "axios";
import serverConfig from "../../config/server-config.js";
class OfficeServices {
  public async presentCheck(
    office_id: string,
    employeeId: string
  ): Promise<boolean> {
    const response = await axios.get<{ data: string }>(
      `${serverConfig.OFFICE_SERVICE}/api/v1/office/employee-check/${office_id}?employeeId=${employeeId}`
    );
    const employeePresent = response.data?.data;
    if (employeeId === employeePresent) return true;
    else return false;
  }
  public isEmployeeLate(
    checkInTime: Date | null,
    thresholdTime: Date | null
  ): boolean {
    if (!checkInTime) {
      return false;
    }
    return checkInTime > thresholdTime!;
  }
  public getThresholdTime(
    officeStartTime: string,
    gracePeriodMinutes: number
  ): Date {
    const [hours, minutes] = officeStartTime.split(":").map(Number);
    const startTime = new Date();
    startTime.setHours(hours!, minutes, 0, 0);
    return new Date(startTime.getTime() + gracePeriodMinutes * 60 * 1000);
  }
}

export default new OfficeServices();
