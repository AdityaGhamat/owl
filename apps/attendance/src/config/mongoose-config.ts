import { connect } from "mongoose";
import serverConfig from "./server-config.js";

export default async function connectionDb(): Promise<void> {
  try {
    await connect(serverConfig.DATABASE_URL_ATTENDANCE_HISTORY as string);
    console.log("Connected to MongoDB successfully with Mongoose.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}
