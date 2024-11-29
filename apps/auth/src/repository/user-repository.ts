import { PrismaClient, User } from "@prisma/client";
import CrudRepository from "./crud-repository.js";
import prisma from "../config/database-config.js";
import { userCreation } from "../types/auth.js";

export class UserRepository extends CrudRepository<userCreation, string> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.user);
  }
  // async findUserById(user_id: string): Promise<User> {
  //   return prisma.findUnique({
  //     where: { user_id },
  //   });
  // }
}

export default new UserRepository(prisma);
