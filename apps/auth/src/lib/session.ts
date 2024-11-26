import { Request, Response } from "express";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import ErrorHandler from "../errors/error.js";
import { StatusCodes } from "http-status-codes";
import { CustomJWTPayload } from "../types/system.js";

class Session {
  private key: Uint8Array;
  private cookieOptions: { name: string; options: object; duration: number };
  constructor() {
    this.key = new TextEncoder().encode(process.env.SECRET_KEY);
    this.cookieOptions = {
      name: "session",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
      },
      duration: 24 * 60 * 60 * 1000,
    };
  }

  async encrypt(payload: JWTPayload) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1day")
      .sign(this.key);
  }

  async decrypt(session: string): Promise<CustomJWTPayload | null> {
    try {
      const { payload } = await jwtVerify(session, this.key, {
        algorithms: ["HS256"],
      });
      return payload as CustomJWTPayload;
    } catch (error) {
      return null;
    }
  }

  async createSession(userId: string, res: Response) {
    const expires = Date.now() + this.cookieOptions.duration;
    const session = await this.encrypt({ userId, expires });
    res.cookie("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: expires,
    });
  }

  async verifySession(req: Request, res: Response) {
    const cookie = req.cookies?.["session"];
    if (!cookie) {
      throw new ErrorHandler(
        "Session cookie not found",
        StatusCodes.UNAUTHORIZED
      );
    }

    const session = await this.decrypt(cookie);
    if (!session || !session.userId) {
      throw new ErrorHandler(
        "Invalid or expired session",
        StatusCodes.UNAUTHORIZED
      );
    }
    return session.userId;
  }

  async deleteSession(res: Response) {
    res.clearCookie(this.cookieOptions.name);
  }
}

export default new Session();
