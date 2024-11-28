import { createTransport } from "nodemailer";
import { nodemailerOptions } from "../utils/common.js";
export const transport = createTransport(nodemailerOptions);
