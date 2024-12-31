import dotenv from "dotenv";
dotenv.config();
export default {
  ANALYTICS_SERVICE: process.env.ANALYTICS_SERVICE,
  ATTENDNANCE_SERVICE: process.env.ATTENDNANCE_SERVICE,
  AUTH_SERVICE: process.env.AUTH_SERVICE,
  GEOLOCATION_SERVICE: process.env.GEOLOCATION_SERVICE,
  MAIL_SERVICE: process.env.MAIL_SERVICE,
  OFFICE_SERVICE: process.env.OFFICE_SERVICE,
  ORGANIZATION_SERVICE: process.env.ORGANIZATION_SERVICE,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
};
