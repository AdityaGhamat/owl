import dotenv from "dotenv";
dotenv.config();

export default {
  ATTENDANCE_SERVICE: process.env.ATTENDANCE_SERVICE,
  AUTH_SERVICE: process.env.AUTH_SERVICE,
  QUEUE_URL: process.env.QUEUE_URL,
  OFFICE_SERVICE: process.env.OFFICE_SERVICE,
};
