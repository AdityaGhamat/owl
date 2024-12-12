import { Context, Next } from "hono";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { CustomJWTPayload } from "../types/services/index.js";
import serverConfig from "../config/server-config.js";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../errors/error-response.js";
//on hold for now will see once api gateway is ready
class AuthMiddleware {
  private key: Uint8Array;

  constructor(c: Context) {
    this.key = new TextEncoder().encode(serverConfig.SECRET_KEY);
  }
  private async decrypt(session: string): Promise<CustomJWTPayload | null> {
    try {
      const { payload } = await jwtVerify(session, this.key, {
        algorithms: ["HS256"],
      });
      return payload as CustomJWTPayload;
    } catch (error) {
      return null;
    }
  }
  private async verifySession(c: Context) {
    const cookie = getCookie(c, "session");
    if (!cookie) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "session cookie not found",
      });
    }
    const session = await this.decrypt(cookie);

    if (!session || !session.userId) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Invalid or expired session",
      });
    }
    return session.userId;
  }

  public async middleware(c: Context, next: Next) {
    const userId = await this.verifySession(c);
    if (!userId) {
      return ErrorResponse(
        StatusCodes.UNAUTHORIZED,
        {},
        "login or signup required"
      );
    }
  }
}

//on hold
