import { PrismaClient, User } from "@prisma/client";
import CrudRepository from "./crud-repository.js";
import prisma from "../config/database-config.js";
import { userCreation } from "../types/auth.js";

export class UserRepository extends CrudRepository<userCreation, string> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.user);
  }
}

export default new UserRepository(prisma);
