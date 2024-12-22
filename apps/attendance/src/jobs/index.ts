import attendanceTransferJob from "./attendance-transfer-job.js";

function startJob() {
  attendanceTransferJob.start();
  console.log("Scheduled jobs are started");
}

export default startJob;
