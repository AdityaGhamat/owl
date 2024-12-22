import { config } from "dotenv";
config();
export default {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_URL_ATTENDANCE_HISTORY: process.env.DATABASE_URL_ATTENDANCE_HISTORY,
};
