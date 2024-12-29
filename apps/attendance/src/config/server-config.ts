import { config } from "dotenv";
config();
export default {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_URL_ATTENDANCE_HISTORY: process.env.DATABASE_URL_ATTENDANCE_HISTORY,
  OFFICE_SERVICE: process.env.OFFICE_SERVICE,
  QUEUE_URL: process.env.QUEUE_URL,
  AUTH_SERVICE: process.env.AUTH_SERVICE,
};
