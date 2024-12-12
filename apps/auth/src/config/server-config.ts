import { config } from "dotenv";
config();
export default {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  OFFICE_SERVICE: process.env.OFFICE_SERVICE,
  GEOFENCE_SERVICE: process.env.GEOFENCE_SERVICE,
};
