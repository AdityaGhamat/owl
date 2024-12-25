import { AttendanceAnalyticsCreationType } from "../types/database.js";
import CrudRepository from "./crud-repository.js";
import prisma from "../config/prisma-config.js";
import { PrismaClient } from "@prisma/client";
class AttendanceAnalyticsRepository extends CrudRepository<
  AttendanceAnalyticsCreationType,
  string
> {
  constructor() {
    super(prisma, prisma.AttendanceAnalytics);
  }
}

export default new AttendanceAnalyticsRepository();
