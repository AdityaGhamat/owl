import { Request } from "express";
import { JWTPayload } from "jose";

interface CustomRequest extends Request {
  user_id?: string;
}

interface CustomJWTPayload extends JWTPayload {
  userId: string;
  expires: number;
}

export type { CustomRequest, CustomJWTPayload };
