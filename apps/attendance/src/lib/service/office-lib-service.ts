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
  private getThresholdTime(
    officeStartTime: string,
    gracePeriodMinutes: number
  ): Date {
    const [hours, minutes] = officeStartTime.split(":").map(Number);
    const startTime = new Date();
    startTime.setHours(hours!, minutes, 0, 0);
    return new Date(startTime.getTime() + gracePeriodMinutes * 60 * 1000);
  }
  public async getOfficeTime(office_id: string): Promise<{
    startTime: string;
    endTime: string;
  }> {
    const response = await axios.get<{
      data: {
        startTime: string;
        endTime: string;
      };
    }>(`${serverConfig.OFFICE_SERVICE}/api/v1/office/office-time/${office_id}`);
    const { startTime, endTime } = response.data?.data;
    return { startTime, endTime };
  }
  public async getThresholdTimeByOfficeTime(
    office_id: string,
    gracePeriod?: number
  ) {
    const { startTime } = await this.getOfficeTime(office_id);

    const response = this.getThresholdTime(startTime, gracePeriod || 15);
    return response;
  }
}

export default new OfficeServices();
