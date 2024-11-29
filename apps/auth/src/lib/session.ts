import { Request, Response } from "express";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { CustomJWTPayload } from "../types/system.js";
import NotFoundException from "../errors/notAuthorizedException.js";
import UnauthorizedException from "../errors/unauthorizedException.js";
import serverConfig from "../config/server-config.js";

class Session {
  private key: Uint8Array;
  private cookieOptions: { name: string; options: object; duration: number };
  constructor() {
    this.key = new TextEncoder().encode(serverConfig.SECRET_KEY);
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
      throw new NotFoundException("Session cookie not found");
    }

    const session = await this.decrypt(cookie);
    if (!session || !session.userId) {
      throw new UnauthorizedException("Invalid or expired session");
    }
    return session.userId;
  }

  async deleteSession(res: Response) {
    res.clearCookie(this.cookieOptions.name);
  }
}

export default new Session();
