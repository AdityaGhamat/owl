import { EmployeeAnalyticsCreationType } from "../types/database.js";
import CrudRepository from "./crud-repository.js";
import prisma from "../config/prisma-config.js";

class EmployeeAnalyticsRepository extends CrudRepository<
  EmployeeAnalyticsCreationType,
  string
> {
  constructor() {
    super(prisma, prisma.employeeAnalytics);
  }
}

export default new EmployeeAnalyticsRepository();
