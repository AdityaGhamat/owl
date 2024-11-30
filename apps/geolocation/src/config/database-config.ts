import { HTTPException } from "hono/http-exception";
import mongoose from "mongoose";
import serverConfig from "./server-config.js";
export async function databaseConnection() {
  if (!serverConfig.DATABASE_URL) {
    console.error("DATABASE_URL is not defined");
    throw new Error("Environment variable DATABASE_URL is missing");
  }
  try {
    const connection = await mongoose.connect(serverConfig.DATABASE_URL);
    console.log(`Server is connected with the database`);
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new HTTPException(500, { message: "Database connection failed" });
  }
}
