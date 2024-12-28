import dotenv from "dotenv";
dotenv.config();
export default {
  DATABASE_URL: process.env.DATABASE_URL,
  OFFICE_SERVICE: process.env.OFFICE_SERVICE,
  AUTH_SERVICE: process.env.AUTH_SERVICE,
  SECRET_KEY: process.env.SECRET_KEY,
  ATTENDANCE_SERVICE: process.env.ATTENDANCE_SERVICE,
  QUEUE_URL: process.env.QUEUE_URL,
};
