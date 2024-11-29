import { PrismaClient, User } from "@prisma/client";
import CrudRepository from "./crud-repository.js";
import prisma from "../config/database-config.js";
import { userCreation } from "../types/auth.js";

export class UserRepository extends CrudRepository<userCreation, string> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.user);
  }
  async updateByEmail(
    email: string,
    data: Partial<userCreation>
  ): Promise<userCreation | null> {
    return this.model.update({
      where: { email },
      data,
    });
  }
  async checkPasswordResetToken(
    reset_token: string
  ): Promise<userCreation | null> {
    return this.model.findFirst({
      where: { reset_password_token: reset_token },
    });
  }
}

export default new UserRepository(prisma);
