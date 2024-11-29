import serverConfig from "../config/server-config.js";
export const nodemailerOptions = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: serverConfig.NODEMAILER_USER,
    pass: serverConfig.NODEMAILER_PASSWORD,
  },
};
