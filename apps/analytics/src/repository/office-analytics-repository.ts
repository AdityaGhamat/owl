import CrudRepository from "./crud-repository.js";
import prisma from "../config/prisma-config.js";
import { OfficeAnalyticsCreationType } from "../types/database.js";

class OfficeAnalyticsRepository extends CrudRepository<
  OfficeAnalyticsCreationType,
  string
> {
  constructor() {
    super(prisma, prisma.officeAnalytics);
  }
}

export default new OfficeAnalyticsRepository();
