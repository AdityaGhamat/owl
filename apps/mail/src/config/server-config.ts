import dotenv from "dotenv";
dotenv.config();
export default {
  NODEMAILER_USER: process.env.NODEMAILER_USER,
  NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
  CLIENT_URL: process.env.CLIENT_URL,
  SENDER: process.env.SENDER,
  QUEUE_URL_EMAIL: process.env.QUEUE_URL_EMAIL,
};
