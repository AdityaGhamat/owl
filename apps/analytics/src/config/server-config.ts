import dotenv from "dotenv";
dotenv.config();

export default {
  ATTENDANCE_SERVICE: process.env.ATTENDANCE_SERVICE,
  AUTH_SERVICE: process.env.AUTH_SERVICE,
};
