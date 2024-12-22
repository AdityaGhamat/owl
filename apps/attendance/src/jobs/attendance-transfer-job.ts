import { CronJob } from "cron";
import attendanceJobService from "../services/attendance-job-service.js";
const attendanceTransferJob = new CronJob("0 0 * * *", () => {
  attendanceJobService.transfer();
});

export default attendanceTransferJob;
